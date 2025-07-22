import React from 'react'
import Card from '@/components/Common/Card'
import Title from '@/components/Common/Typography/Title'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ServiceType } from '@/lib/storage/services/types'
import SelectButton from './SelectButton'
import Cart from '@/lib/storage/Cart'

type BundleCardProps = {
    id: string
    title: string
    subtitle: string
    price: number
    category: string
    services: ServiceType[]
    cart: Cart
}

const BundleCard = ({
    id,
    title,
    price,
    category,
    services,
    subtitle,
    cart,
}: BundleCardProps) => {
    const currency = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    })

    const onSelectItem = (selected: boolean) => {
        if (selected)
            cart.addItem({
                id,
                name: title,
                price,
                category,
            })
        else cart.removeItem(id)
    }

    return (
        <Card id={id}>
            <span className="badge badge-warning">{category}</span>
            <Title
                size="2xl"
                text={title}
                subtitle={subtitle}
                className="my-3"
            />
            <section>
                <p className="text-4xl font-semibold">
                    {currency.format(price)}{' '}
                    <span className="text-2xl text-base-content/50">MXN</span>
                </p>
            </section>
            <SelectButton
                onSelect={onSelectItem}
                initialStatus={cart.getItem(id) !== undefined}
            />
            <ul className="list">
                {services.map((service, index) => (
                    <li key={index} className="list-row p-2">
                        <CheckCircleIcon className="size-6 me-2 inline-block text-success" />
                        <span>{service.name}</span>
                    </li>
                ))}
            </ul>
        </Card>
    )
}

export default BundleCard
