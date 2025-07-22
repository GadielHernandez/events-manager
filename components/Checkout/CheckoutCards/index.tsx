import React from 'react'
import EventData from './EventData'
import ClientData from './ClientData'
import PersonsData from './PersonsData'

const CheckoutCards = () => {
    return (
        <form id="event-data" className="grid gap-4">
            <ClientData />
            <EventData />
            <PersonsData />
        </form>
    )
}

export default CheckoutCards
