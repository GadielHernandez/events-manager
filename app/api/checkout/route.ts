import { CartItem } from '@/lib/storage/Cart'
import { getBundleByCategory } from '@/lib/storage/services'
import { generateContractImage } from '@/services/contract'
import { addImageLinkToEvent, createEvent } from '@/services/google/calendar'
import { NextRequest, NextResponse } from 'next/server'
import GoogleDrive from '@/services/google/drive'
import { sendPreContractMail } from '@/services/email'
import { generateContractToken } from '@/services/contracts/token'
import { sendContractNotification } from '@/services/whatsapp'

const FILE_NAME_PREFIX_CONTRACT = process.env.FILE_NAME_PREFIX_CONTRACT
const FILE_NAME_PREFIX_PRECONTRACT = process.env.FILE_NAME_PREFIX_PRECONTRACT

export async function POST(req: NextRequest) {
    const {
        Celebrated,
        ClientAddress,
        ClientEmail,
        ClientMobile,
        ClientName,
        ClientPhone,
        EventDateTime,
        EventType,
        PlaceAddress,
        PlaceName,
        bundles,
        CodeDiscount,
        customDiscount,
        customAdvance,
    } = await req.json()

    const findBundles = bundles.map((bundle: CartItem) =>
        getBundleByCategory(bundle.categoryId, bundle.id).then((res) => ({
            ...res,
            category: bundle.category,
            extras: bundle.extras,
            quantitySelected: bundle.quantity,
        }))
    )
    const serverBundles = await Promise.all(findBundles)

    // Calculate total for validation
    const total = serverBundles.reduce((sum, bundle) => {
        const quantity =
            bundle.quantitySelected > 0 ? bundle.quantitySelected : 1
        return sum + bundle.price * quantity
    }, 0)

    // Server-side validation of overrides
    const validatedCustomDiscount =
        typeof customDiscount === 'number' && customDiscount >= 0
            ? Math.min(customDiscount, total) // Cap at total
            : undefined

    const validatedCustomAdvance =
        typeof customAdvance === 'number' && customAdvance >= 0
            ? customAdvance
            : undefined

    await GoogleDrive.setFolder()
    await GoogleDrive.setCounter()
    const contractFolio = GoogleDrive.getContractFolio()

    const event = await createEvent({
        contractFolio,
        Celebrated,
        ClientAddress,
        ClientEmail,
        ClientMobile,
        ClientName,
        ClientPhone,
        EventDateTime,
        EventType,
        PlaceAddress,
        PlaceName,
        bundles: serverBundles,
    })

    const contractImgParams = {
        contractFolio,
        Celebrated,
        ClientAddress,
        ClientEmail,
        ClientMobile,
        ClientName,
        ClientPhone,
        EventDateTime,
        EventType,
        PlaceAddress,
        PlaceName,
        bundles: serverBundles,
        CodeDiscount,
        customDiscount: validatedCustomDiscount,
        customAdvance: validatedCustomAdvance,
    }

    const [precontract, contract] = await Promise.all([
        generateContractImage({
            ...contractImgParams,
            imageName: 'precontract',
        }),
        generateContractImage({
            ...contractImgParams,
            imageName: 'contract',
        }),
    ])

    const [precontractSave, contractSave] = await Promise.all([
        GoogleDrive.saveImage(
            precontract,
            `${FILE_NAME_PREFIX_PRECONTRACT}${contractFolio}`
        ),
        GoogleDrive.saveImage(
            contract,
            `${FILE_NAME_PREFIX_CONTRACT}${contractFolio}`
        ),
    ])

    let contractToken: string | undefined
    if (contractSave.id) {
        contractToken = await generateContractToken(
            contractSave.id,
            contractFolio
        )
    } else {
        console.warn(
            '[Checkout] contractSave.id is missing — skipping WhatsApp notification'
        )
    }

    const updated = await addImageLinkToEvent(
        event.id || '',
        precontractSave.webViewLink || '',
        contractSave.webViewLink || ''
    )

    await sendPreContractMail({
        to: ClientEmail,
        contract: precontract,
    })

    if (contractToken) {
        try {
            await sendContractNotification({
                phone: ClientMobile,
                clientName: ClientName,
                contractToken,
                folio: contractFolio,
            })
        } catch (err) {
            console.error('[WhatsApp] Error al enviar notificación:', err)
        }
    }

    return NextResponse.json(updated)
}
