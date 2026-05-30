'use client'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import Card from '@/components/Common/Card'
import Cart, { CartItem } from '@/lib/storage/Cart'
import InputField from '@/components/Common/DataInput/InputField'
import Button from '@/components/Common/Button'
import Discount from '@/lib/api/Discount'
import { useAdmin } from '@/contexts/AdminContext'

const ListSelected = () => {
    const currency = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    })

    const { settings } = useAdmin()
    const [codeDiscount, setCodeDiscount] = useState('')
    const [items, setItems] = useState<CartItem[] | null>(null)
    const [total, setTotal] = useState<number>(0)
    const [discountAmount, setDiscountAmount] = useState<number>(0)

    const calculateDiscount = async () => {
        const discount = await Discount.checkDiscount(codeDiscount)
        setDiscountAmount(discount)

        const itemsTotal = calculateTotal()
        const newTotal = itemsTotal - discount
        setTotal(newTotal)
    }

    const calculateTotal = () => {
        const items = Cart.getItems()
        setItems(items)

        const total = items.reduce((sum, item) => {
            const itemTotal =
                item.quantity > 0 ? item.price * item.quantity : item.price
            return sum + itemTotal
        }, 0)
        return total
    }

    useEffect(() => {
        const total = calculateTotal()
        setTotal(total)
    }, [])

    // Recalculate when admin settings change
    useEffect(() => {
        const itemsTotal = calculateTotal()
        const extra = settings.customExtra ?? 0

        if (settings.customDiscount !== undefined) {
            // Apply custom discount
            setDiscountAmount(settings.customDiscount)
            setTotal(itemsTotal - settings.customDiscount + extra)
        } else {
            // Reset to original total or code discount
            if (codeDiscount && discountAmount > 0) {
                // Keep code discount if it was applied
                setTotal(itemsTotal - discountAmount + extra)
            } else {
                // Reset to original total
                setDiscountAmount(0)
                setTotal(itemsTotal + extra)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.customDiscount, settings.customExtra])

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
                        price={item.price}
                        quantity={item.quantity}
                    ></ListItem>
                ))}

                {!settings.customDiscount && (
                    <li className="list-row">
                        <article className="list-col-grow">
                            <InputField
                                id="codeDiscount"
                                placeholder="Código de descuento"
                                value={codeDiscount}
                                onChange={(e) => setCodeDiscount(e.target.value)}
                            />
                        </article>
                        <aside className="py-1">
                            <Button
                                className="rounded-lg"
                                onClick={calculateDiscount}
                            >
                                Aplicar
                            </Button>
                        </aside>
                    </li>
                )}

                {discountAmount > 0 && (
                    <li className="list-row">
                        <article className="list-col-grow">
                            <header className="text-sm">
                                Descuento {settings.customDiscount !== undefined ? '(Admin)' : ''}
                            </header>
                        </article>
                        <aside className="font-medium text-success">
                            -{currency.format(discountAmount)}
                        </aside>
                    </li>
                )}

                {settings.customAdvance !== undefined && (
                    <li className="list-row">
                        <article className="list-col-grow">
                            <header className="text-sm">
                                Anticipo (Admin)
                            </header>
                        </article>
                        <aside className="font-medium text-info">
                            {currency.format(settings.customAdvance)}
                        </aside>
                    </li>
                )}

                {settings.customExtra !== undefined && settings.customExtra > 0 && (
                    <li className="list-row">
                        <article className="list-col-grow">
                            <header className="text-sm">
                                Cargo extra (Admin)
                            </header>
                        </article>
                        <aside className="font-medium text-warning">
                            +{currency.format(settings.customExtra)}
                        </aside>
                    </li>
                )}

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
