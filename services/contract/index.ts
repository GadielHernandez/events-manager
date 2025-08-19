import { createCanvas, loadImage } from 'canvas'
import { BundleType } from '@/lib/storage/services/types'

type CreateEventParams = {
    id: string
    Celebrated: string
    ClientAddress: string
    ClientEmail: string
    ClientMobile: string
    ClientName: string
    ClientPhone: string
    EventDateTime: string
    EventType: string
    PlaceAddress: string
    PlaceName: string
    bundles: BundleType[]
}

export async function generateContractImage(params: CreateEventParams) {
    const {
        id,
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
    } = params

    const width = 1125
    const height = 1466
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    const IS_PROD = process.env.NODE_ENV === 'production'
    const BASE_PATH = IS_PROD ? '.next/server' : process.cwd()
    const image = await loadImage(BASE_PATH + '/services/contract/contract.jpg')
    ctx.drawImage(image, 0, 0, width, height)

    //const eventDate = new Date(EventDateTime)

    // Agregar textos
    ctx.fillStyle = 'black'
    ctx.font = '20px Arial'

    const now = new Date()
    ctx.fillText(
        now.toLocaleDateString('es-MX', { timeZone: 'America/Monterrey' }),
        20,
        75
    ) // Fecha
    ctx.fillText(id, 940, 75) // Fecha

    const eventDate = new Date(EventDateTime)
    ctx.fillText(
        eventDate.toLocaleDateString('es-MX', {
            timeZone: 'America/Monterrey',
        }),
        706,
        607
    ) // Fecha evenet

    ctx.fillText(ClientName, 232, 660) // Cliente
    ctx.fillText(EventType, 864, 660) // Tipo de evento

    ctx.fillText(ClientAddress, 229, 704) // Dirección
    ctx.fillText(
        eventDate.toLocaleTimeString('es-MX', {
            timeZone: 'America/Monterrey',
        }),
        896,
        704
    ) // Hora

    ctx.fillText(Celebrated, 224, 771) // Festejados
    ctx.fillText(ClientEmail, 782, 771) // Correp

    ctx.fillText(ClientPhone, 180, 825) // Telefono
    ctx.fillText(ClientMobile, 742, 825) // Celular

    ctx.fillText(`${PlaceName}, ${PlaceAddress}`, 347, 881) // Ubicacion

    let serviceCount = 0,
        serviceText = '',
        total = 0
    let yStartServices = 960
    const xStartServices = 30
    const lineHeightServices = 45
    bundles.forEach((bundle) => {
        serviceCount++
        serviceText = `${serviceText} - ${bundle.name}`
        total += bundle.price

        if (serviceCount == 3) {
            ctx.fillText(`${serviceText} `, xStartServices, yStartServices)
            yStartServices += lineHeightServices
            serviceCount = 0
            serviceText = ''
        }
    })
    if (serviceText !== '')
        ctx.fillText(`${serviceText}, `, xStartServices, yStartServices)

    ctx.fillText(`${PlaceName}, ${PlaceAddress}`, 347, 881) // Ubicacion

    ctx.fillText(`$${total}`, 867, 1075) // Total
    ctx.fillText('$0', 867, 1133) // Anticipo
    ctx.fillText(`$${total}`, 867, 1163) // Resto

    // Exportar como imagen
    const buffer = canvas.toBuffer('image/jpeg')
    return buffer
}
