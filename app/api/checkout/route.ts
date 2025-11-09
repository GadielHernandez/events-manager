import { CartItem } from '@/lib/storage/Cart'
import { getBundleByCategory } from '@/lib/storage/services'
import { generateContractImage } from '@/services/contract'
import { addImageLinkToEvent, createEvent } from '@/services/google/calendar'
import { NextRequest, NextResponse } from 'next/server'
import GoogleDrive from '@/services/google/drive'
import { sendPreContractMail } from '@/services/email'

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
    } = await req.json()

    const findBundles = bundles.map((bundle: CartItem) =>
        getBundleByCategory(bundle.categoryId, bundle.id).then((res) => ({
            ...res,
            category: bundle.category,
            extras: bundle.extras,
        }))
    )
    const serverBundles = await Promise.all(findBundles)

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
    }

    const preContract = await generateContractImage({
        ...contractImgParams,
        imageName: 'precontract',
    })
    const contract = await generateContractImage({
        ...contractImgParams,
        imageName: 'contract',
    })

    const contractSave = await GoogleDrive.saveImage(
        contract,
        `Contrato${contractFolio}`
    )
    const preContractSave = await GoogleDrive.saveImage(
        preContract,
        `PreContrato${contractFolio}`
    )
    const updated = await addImageLinkToEvent(
        event.id || '',
        preContractSave.webViewLink || '',
        contractSave.webViewLink || ''
    )

    await sendPreContractMail({
        to: ClientEmail,
        contract: preContract,
    })
    return NextResponse.json(updated)
}
