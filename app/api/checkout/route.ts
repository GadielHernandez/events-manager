import { CartItem } from '@/lib/storage/Cart'
import { getBundleByCategory } from '@/lib/storage/services'
import { generateContractImage } from '@/services/contract'
import {
    addImageLinkToEvent,
    createEvent,
    saveImageOnDrive,
} from '@/services/google/calendar'
import { NextRequest, NextResponse } from 'next/server'

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
        getBundleByCategory(bundle.categoryId, bundle.id)
    )
    const serverBundles = await Promise.all(findBundles)

    const nFolio = new Date().getTime()

    const event = await createEvent({
        nFolio: String(nFolio),
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
    if (!event || !event.id) return NextResponse.json({ error: '' })

    const image = await generateContractImage({
        id: String(nFolio),
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

    const saved = await saveImageOnDrive(image)
    const updated = await addImageLinkToEvent(event.id, saved.webViewLink || '')
    return NextResponse.json(updated)
}
