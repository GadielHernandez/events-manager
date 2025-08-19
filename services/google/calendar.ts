import fs from 'fs'
import { EVENT_TYPES, EVENT_TYPES_COLORS } from '@/lib/types'
import { google } from 'googleapis'
import { Readable } from 'stream'
import { BundleType } from '@/lib/storage/services/types'

const EVENT_DURATION = 4
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN! // Este lo obtienes una vez con OAuth

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
})

type CreateEventParams = {
    nFolio: string
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

export async function createEvent(params: CreateEventParams) {
    const {
        nFolio,
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

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    try {
        const startDate = new Date(EventDateTime)
        const endDate = new Date(EventDateTime)
        endDate.setHours(endDate.getHours() + EVENT_DURATION)

        const colorId = EVENT_TYPES_COLORS[EventType as EVENT_TYPES]
        let description = `
👤 CLIENTE: 
- Nombre: ${ClientName}
- Dirección: ${ClientAddress}
- Correo: ${ClientEmail}
- Teléfono: ${ClientPhone}
- Celular/Whatsapp: ${ClientMobile}

📌 LUGAR DEL EVENTO:
- Nombre: ${PlaceName}
- Dirección: ${PlaceAddress}

🎉 FESTEJADOS:
- Nombres: ${Celebrated}

📦 SERVICIOS \n
`.trim()

        bundles.forEach(
            (bundle) => (description = `${description} - ${bundle.name} \n`)
        )

        description += `\n FOLIO: ${nFolio}`

        const event = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: {
                summary: `[${EventType}]: ${Celebrated}`,
                description,
                colorId,
                status: 'tentative',
                start: {
                    dateTime: startDate.toISOString(),
                },
                end: {
                    dateTime: endDate.toISOString(),
                },
            },
        })

        return event.data
    } catch (err) {
        console.error('Error creating event:', err)
        return {
            id: null,
            error: 'Failed to create event',
        }
    }
}

function bufferToStream(buffer: Buffer) {
    const stream = new Readable()
    stream.push(buffer)
    stream.push(null) // fin del stream
    return stream
}

export async function saveImageOnDrive(img: Buffer) {
    const drive = google.drive({ version: 'v3', auth: oauth2Client })
    const result = await drive.files.create({
        requestBody: {
            name: `Contrato${new Date().toISOString()}`,
        },
        media: {
            mimeType: 'image/jpeg',
            body: bufferToStream(img),
        },
        fields: 'id, webViewLink',
    })

    return result.data
}

export async function addImageLinkToEvent(eventId: string, imageLink: string) {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Obtener el evento actual
    const { data: event } = await calendar.events.get({
        calendarId: 'primary',
        eventId,
    })

    // Actualizar descripción con el link
    const newDescription =
        (event.description || '') + `\n\n📎 Contrato: ${imageLink}`

    const updated = await calendar.events.patch({
        calendarId: 'primary',
        eventId,
        requestBody: {
            description: newDescription,
        },
    })

    return updated.data
}
