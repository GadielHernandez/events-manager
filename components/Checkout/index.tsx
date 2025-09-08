import React from 'react'
import Title from '@/components/Common/Typography/Title'
import ListSelected from '@/components/Checkout/ListSelected'
import CheckoutCards from '@/components/Checkout/CheckoutCards'
import AcceptButton from '@/components/Checkout/AcceptButton'
import ConfirmDialog from '@/components/Checkout/ConfirmDialog'
import Container from '../Common/Container'
import Header from '../Common/Header'

const CheckoutPage = () => {
    const idConfirmDialog = 'confirm-dialog'
    return (
        <>
            <Header className="flex min-h-48 bg-primary text-white">
                <header className="m-auto">
                    <Title
                        text="Completa la siguiente información"
                        subtitle="Para solicitar el contrato para tu evento"
                        size="4xl"
                        weight="bold"
                    />
                </header>
            </Header>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section className="grid gap-4">
                        <CheckoutCards />
                    </section>
                    <section className="">
                        <ListSelected />
                        <AcceptButton confirmDialog={idConfirmDialog} />
                        <ConfirmDialog id={idConfirmDialog} />
                    </section>
                </div>
            </Container>
        </>
    )
}

export default CheckoutPage
