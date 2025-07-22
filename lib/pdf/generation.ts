import PDF from './index'
import Cart from '../storage/Cart'

const texts: Record<string, string> = {
    EventDate: 'Fecha del evento',
    ClientName: 'Nombre del cliente',
    ClientAddress: 'Dirección (cliente)',
    ClientEmail: 'Correo electronico',
    ClientPhone: 'Telefono',
    ClientMobile: 'Celular/Whatsapp',
    EventType: 'Tipo de evento',
    EventTime: 'Hora del evento',
    PlaceName: 'Nombre del Lugar',
    PlaceAddress: 'Direccion del Lugar',
    services: 'Servicios',
    Celebrated: 'Festejado(s)',
}

export const createContract = async (
    values: Record<string, FormDataEntryValue>
) => {
    const cart = new Cart()
    const pdf = new PDF()
    pdf.addHeader(
        new Date().toLocaleDateString(),
        new Date().getTime().toString()
    )
    await pdf.addBannerTitle('Contrato')

    pdf.addKeyValue(texts.ClientName, values['ClientName'] as string)
    pdf.addKeyValue(texts.ClientAddress, values['ClientAddress'] as string)

    pdf.addMultipleKeyValue([
        { title: texts.ClientEmail, text: values['ClientEmail'] as string },
        { title: texts.ClientPhone, text: values['ClientPhone'] as string },
        { title: texts.ClientMobile, text: values['ClientMobile'] as string },
    ])
    pdf.addMultipleKeyValue([
        { title: texts.EventType, text: values['EventType'] as string },
        { title: texts.EventDate, text: values['Celebrated'] as string },
        { title: texts.EventTime, text: values['Celebrated'] as string },
    ])
    pdf.addKeyValue(texts.Celebrated, values['Celebrated'] as string)
    pdf.addKeyValue(texts.PlaceName, values['PlaceName'] as string)
    pdf.addKeyValue(texts.PlaceAddress, values['PlaceAddress'] as string)

    pdf.addSubtitle('Servicios Contratados')
    const bundles = cart.getItems()
    pdf.addSelectedProducts(bundles)
    pdf.download('Contrato')
    return
}
