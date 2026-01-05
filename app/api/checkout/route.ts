import { CartItem } from '@/lib/storage/Cart'
import { getBundleByCategory } from '@/lib/storage/services'
import { generateContractImage } from '@/services/contract'
import { addImageLinkToEvent, createEvent } from '@/services/google/calendar'
import { NextRequest, NextResponse } from 'next/server'
import GoogleDrive from '@/services/google/drive'
import { sendPreContractMail } from '@/services/email'

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

    const updated = await addImageLinkToEvent(
        event.id || '',
        precontractSave.webViewLink || '',
        contractSave.webViewLink || ''
    )

    await sendPreContractMail({
        to: ClientEmail,
        contract: precontract,
    })
    return NextResponse.json(updated)
}
