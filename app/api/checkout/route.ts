import { CartItem } from '@/lib/storage/Cart'
import { getBundleByCategory } from '@/lib/storage/services'
import { generateContractImage } from '@/services/contract'
import { addImageLinkToEvent, createEvent } from '@/services/google/calendar'
import { NextRequest, NextResponse } from 'next/server'
import GoogleDrive from '@/services/google/drive'

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

    const image = await generateContractImage({
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

    const saved = await GoogleDrive.saveImage(image, contractFolio)
    const updated = await addImageLinkToEvent(
        event.id || '',
        saved.webViewLink || ''
    )
    return NextResponse.json(updated)
}
