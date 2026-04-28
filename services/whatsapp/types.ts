export interface WhatsAppContractParams {
    phone: string
    clientName: string
    contractToken: string
    folio: string
}

export interface ManyChatSubscriber {
    id: string
    status: 'active' | 'stopped'
    whatsapp_phone?: string
    first_name?: string
    last_name?: string
}

export interface ContractCustomFields {
    nombre_cliente: string
    link_contrato: string
    folio: string
}

export interface ManyChatResponse<T> {
    status: 'success' | 'error'
    data: T
}

export interface ManyChatResponseList<T> {
    status: 'success' | 'error'
    data: T[]
}
