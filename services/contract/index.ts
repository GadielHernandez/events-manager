import fs from 'fs/promises'
import path from 'path'
import { createCanvas, loadImage, registerFont } from 'canvas'

const BASE_PATH = 'services/contract/'
const MAX_CONTRACT_ADVANCE = Number(process.env.MAX_CONTRACT_ADVANCE || 3500)
const MIN_CONTRACT_ADVANCE = Number(process.env.MIN_CONTRACT_ADVANCE || 1000)

registerFont(path.join(process.cwd(), BASE_PATH, 'OpenSans-Regular.ttf'), {
    family: 'OpenSans',
})

type CreateEventParams = {
    contractFolio: string
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
    bundles: any[]
    imageName: string
}

const currency = Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
})

export async function generateContractImage(params: CreateEventParams) {
    const {
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
        bundles,
        imageName,
    } = params

    const width = 1125
    const height = 1466
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    const filePath = path.join(process.cwd(), BASE_PATH, imageName)
    const imageBuffer = await fs.readFile(filePath)

    const image = await loadImage(imageBuffer)

    ctx.drawImage(image, 0, 0, width, height)

    //const eventDate = new Date(EventDateTime)

    // Agregar textos
    ctx.fillStyle = 'black'
    ctx.font = '20px "OpenSans"'

    const now = new Date()
    ctx.fillText(
        now.toLocaleDateString('es-MX', { timeZone: 'America/Monterrey' }),
        20,
        75
    ) // Fecha
    ctx.fillText(contractFolio, 990, 75) // Fecha

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
        serviceText = `${serviceText} - ${bundle.name}(${bundle.category})`

        if (bundle.extras) {
            serviceText = `${serviceText} + ${bundle.extras.join(' + ')}`
            serviceCount++
        }

        total += bundle.price

        if (serviceCount == 2) {
            ctx.fillText(`${serviceText} `, xStartServices, yStartServices)
            yStartServices += lineHeightServices
            serviceCount = 0
            serviceText = ''
        }
    })
    if (serviceText !== '')
        ctx.fillText(`${serviceText}, `, xStartServices, yStartServices)

    ctx.fillText(`${PlaceName}, ${PlaceAddress}`, 347, 881) // Ubicacion

    let advance =
        total <= MAX_CONTRACT_ADVANCE + MAX_CONTRACT_ADVANCE * 0.4
            ? MIN_CONTRACT_ADVANCE
            : MAX_CONTRACT_ADVANCE

    ctx.fillText(currency.format(total), 867, 1075) // Total
    ctx.fillText(currency.format(advance), 867, 1133) // Anticipo
    ctx.fillText(currency.format(total - advance), 867, 1163) // Resto

    // Exportar como imagen
    const buffer = canvas.toBuffer('image/jpeg')
    return buffer
}
