import fs from 'fs/promises'
import path from 'path'
import { createCanvas, loadImage, registerFont } from 'canvas'
import { checkDiscount } from '../discount'

const BASE_PATH = 'services/contract/'
const MAX_CONTRACT_ADVANCE = Number(process.env.MAX_CONTRACT_ADVANCE || 3500)
const MIN_CONTRACT_ADVANCE = Number(process.env.MIN_CONTRACT_ADVANCE || 1500)
const TOTAL_CONTRACT_MIN = Number(process.env.TOTAL_CONTRACT_MIN || 7000)

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
    CodeDiscount: string
}

const currency = Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
})

const calculateFinalTotals = (total: number, CodeDiscount: string) => {
    const discount = checkDiscount(CodeDiscount)
    let finalTotal = total - discount

    let advance =
        finalTotal <= TOTAL_CONTRACT_MIN
            ? MIN_CONTRACT_ADVANCE
            : MAX_CONTRACT_ADVANCE

    advance = advance >= finalTotal ? total : advance

    return {
        total: finalTotal,
        advance,
    }
}

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
        CodeDiscount,
    } = params

    const width = 1125
    const height = 1466
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    const filePath =
        imageName === 'contract'
            ? path.join(process.cwd(), BASE_PATH, 'contract.jpg')
            : path.join(process.cwd(), BASE_PATH, 'pre-contract.jpg')

    const imageBuffer = await fs.readFile(filePath)

    const image = await loadImage(imageBuffer)

    ctx.drawImage(image, 0, 0, width, height)

    //const eventDate = new Date(EventDateTime)

    // Agregar textos
    ctx.fillStyle = 'black'
    ctx.font = '20px "OpenSans"'

    const now = new Date()
    ctx.fillText(
        now.toLocaleDateString('es-MX', {
            timeZone: 'America/Monterrey',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }),
        20,
        75
    ) // Fecha
    ctx.fillText(contractFolio, 990, 75) // Fecha

    const eventDate = new Date(EventDateTime)
    ctx.fillText(
        eventDate.toLocaleDateString('es-MX', {
            timeZone: 'America/Monterrey',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
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
            hour: '2-digit',
            minute: '2-digit',
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

        const quantity =
            bundle.quantitySelected > 0 ? bundle.quantitySelected : 1
        serviceText = `${serviceText} - ${bundle.name}(x${quantity}) [${bundle.category}]`

        if (bundle.extras) {
            serviceText = `${serviceText} + ${bundle.extras.join(' + ')}`
            serviceCount++
        }

        total += bundle.price * quantity

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

    const totals = calculateFinalTotals(total, CodeDiscount)

    ctx.fillText(currency.format(totals.total), 867, 1075) // Total
    ctx.fillText(currency.format(totals.advance), 867, 1133) // Anticipo
    ctx.fillText(currency.format(totals.total - totals.advance), 867, 1163) // Resto

    // Exportar como imagen
    const buffer = canvas.toBuffer('image/jpeg')
    return buffer
}
