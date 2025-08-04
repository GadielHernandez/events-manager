import { EVENT_TYPES, EVENT_TYPES_COLORS } from '@/lib/types'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

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
    } = await req.json()

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    try {
        const startDate = new Date(EventDateTime)
        const endDate = new Date(EventDateTime)
        endDate.setHours(endDate.getHours() + EVENT_DURATION)

        const colorId = EVENT_TYPES_COLORS[EventType as EVENT_TYPES]
        const description = `
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
`.trim()

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

        return NextResponse.json({ eventId: event.data }, { status: 200 })
    } catch (err) {
        console.error('Error creating event:', err)
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        )
    }
}
