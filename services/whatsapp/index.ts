import {
    ManyChatResponse,
    ManyChatResponseList,
    ManyChatSubscriber,
    WhatsAppContractParams,
} from './types'

const MANYCHAT_API = 'https://api.manychat.com'
const WHATSAPP_PHONE_FIELD_ID = process.env.WHATSAPP_PHONE_FIELD_ID
const HEADERS = {
    Authorization: `Bearer ${process.env.MANYCHAT_API_KEY}`,
    'Content-Type': 'application/json',
}

function normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, '')
    if (digits.length === 10) return `521${digits}`
    if (digits.startsWith('521')) return digits
    if (digits.startsWith('52')) return `521${digits.slice(2)}`
    return digits
}

async function findOrCreateSubscriber(
    phone: string,
    name: string
): Promise<string> {
    const findRes = await fetch(
        `${MANYCHAT_API}/fb/subscriber/findByCustomField?field_id=${WHATSAPP_PHONE_FIELD_ID}&field_value=${encodeURIComponent(
            phone
        )}`,
        { headers: HEADERS }
    )
    const findData =
        (await findRes.json()) as ManyChatResponseList<ManyChatSubscriber>
    const subscriber = findData.data.find(
        (sub) => sub.whatsapp_phone === `+${phone}`
    )

    if (findData.status === 'success' && subscriber) return subscriber.id

    const createRes = await fetch(
        `${MANYCHAT_API}/fb/subscriber/createSubscriber`,
        {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                first_name: name,
                whatsapp_phone: `+${phone}`,
                has_opt_in_message_whatsapp: true,
            }),
        }
    )
    const createData =
        (await createRes.json()) as ManyChatResponse<ManyChatSubscriber>
    if (createData.status !== 'success')
        throw new Error(
            `ManyChat createSubscriber error: ${JSON.stringify(createData)}`
        )

    return createData.data.id
}

export async function sendContractNotification(
    params: WhatsAppContractParams
): Promise<void> {
    const { phone, clientName, contractToken, folio } = params
    const normalizedPhone = normalizePhone(phone)

    const subscriberId = await findOrCreateSubscriber(
        normalizedPhone,
        clientName
    )

    const fieldsRes = await fetch(
        `${MANYCHAT_API}/fb/subscriber/setCustomFields`,
        {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                subscriber_id: subscriberId,
                fields: [
                    {
                        field_id: process.env.MANYCHAT_FIELD_CONTRACT_LINK,
                        field_value: contractToken,
                    },
                    {
                        field_id: process.env.MANYCHAT_FIELD_FOLIO,
                        field_value: folio,
                    },
                ],
            }),
        }
    )
    const fieldsData = (await fieldsRes.json()) as ManyChatResponse<null>
    if (fieldsData.status !== 'success')
        throw new Error(
            `ManyChat setCustomFields error: ${JSON.stringify(fieldsData)}`
        )

    const flowRes = await fetch(`${MANYCHAT_API}/fb/sending/sendFlow`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            subscriber_id: subscriberId,
            flow_ns: process.env.MANYCHAT_FLOW_ID,
        }),
    })
    const flowData = (await flowRes.json()) as ManyChatResponse<null>
    if (flowData.status !== 'success')
        throw new Error(`ManyChat sendFlow error: ${JSON.stringify(flowData)}`)
}
