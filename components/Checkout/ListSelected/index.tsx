'use client'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import Card from '@/components/Common/Card'
import Cart, { CartItem } from '@/lib/storage/Cart'

const ListSelected = () => {
    const currency = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    })

    const [items, setItems] = useState<CartItem[] | null>(null)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const items = Cart.getItems()
        setItems(items)

        const total = items.reduce((sum, item) => {
            return sum + item.price
        }, 0)
        setTotal(total)
    }, [])

    return (
        <Card>
            <ul className="list">
                <li className="p-4 text-sm font-bold tracking-wide">
                    PAQUETES SELECCIONADOS
                </li>
                {items?.map((item) => (
                    <ListItem
                        key={item.id}
                        categoryId={item.categoryId}
                        category={item.category}
                        name={item.name}
                        price={currency.format(item.price)}
                    ></ListItem>
                ))}

                <li className="list-row">
                    <article className="list-col-grow">
                        <header className="text-sm uppercase font-bold ">
                            Total
                        </header>
                    </article>
                    <aside className="font-medium">
                        {currency.format(total)}
                    </aside>
                </li>
            </ul>
        </Card>
    )
}

export default ListSelected
