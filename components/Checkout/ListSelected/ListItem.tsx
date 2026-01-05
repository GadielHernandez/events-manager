import { PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

type ListItemProps = {
    category: string
    name: string
    price: number
    categoryId: string
    quantity: number
}
const ListItem = ({
    category,
    name,
    price,
    categoryId,
    quantity,
}: ListItemProps) => {
    const categoryURL = `/services?category=${categoryId}`
    const currency = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    })

    const priceTotal = quantity > 0 ? price * quantity : price

    return (
        <li className="list-row">
            <Link href={categoryURL}>
                <button className="btn btn-square btn-ghost px-0">
                    <PencilIcon className="w-4" />
                </button>
            </Link>
            <article className="list-col-grow">
                <header>
                    {name} {quantity > 0 && `x${quantity}`}
                </header>
                <p className="text-xs uppercase font-semibold opacity-60">
                    {category}
                </p>
            </article>
            <aside className="font-medium m-auto">
                {currency.format(priceTotal)}
            </aside>
        </li>
    )
}

export default ListItem
