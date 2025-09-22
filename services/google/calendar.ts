import GoogleClient from './index'
import { EVENT_TYPES, EVENT_TYPES_COLORS } from '@/lib/types'
import { google } from 'googleapis'
import { BundleType } from '@/lib/storage/services/types'

const EVENT_DURATION = 4

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
    bundles: BundleType[]
}

export async function createEvent(params: CreateEventParams) {
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
    } = params

    const calendar = google.calendar({ version: 'v3', auth: GoogleClient.auth })

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

📦 SERVICIOS:
`.trim()

        bundles.forEach((bundle) => {
            description = `${description} - \n ${bundle.name} `
            if (bundle.extras)
                description = `${description} + ${bundle.extras.join(' + ')} `
        })

        description += `\n FOLIO: ${contractFolio}`

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

export async function addImageLinkToEvent(eventId: string, imageLink: string) {
    const calendar = google.calendar({ version: 'v3', auth: GoogleClient.auth })

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
