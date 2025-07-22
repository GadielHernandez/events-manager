import React from 'react'
import Title from '@/components/Common/Typography/Title'
import Grid from '@/components/Common/Grid'
import ListSelected from '@/components/Checkout/ListSelected'
import CheckoutCards from '@/components/Checkout/CheckoutCards'
import AcceptButton from '@/components/Checkout/AcceptButton'

const CheckoutPage = () => {
    return (
        <div className="">
            <Title
                text="Completa la siguiente información"
                subtitle="Pars separar nuestro servicio para tu evento"
                className="my-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="grid gap-4">
                    <CheckoutCards />
                </section>
                <section className="">
                    <ListSelected />
                    <AcceptButton />s
                </section>
            </div>
        </div>
    )
}

export default CheckoutPage
