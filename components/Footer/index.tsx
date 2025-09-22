'use client'

import React, { useEffect, useState } from 'react'
import Button from '../Common/Button'
import Paragraph from '../Common/Typography/Paragraph'
import { useRouter } from 'next/navigation'
import Cart, { CartItem } from '@/lib/storage/Cart'
import Link from 'next/link'

const Footer = () => {
    const router = useRouter()

    const [bundles, setBundles] = useState(0)
    const onChangNotify = (items: Map<string, CartItem>) => {
        setBundles(items.size)
    }

    useEffect(() => {
        setBundles(Cart.getItems().length || 0)

        Cart.addChangeCallback(onChangNotify)
    }, [])

    return (
        <footer className="flex justify-between bg-neutral text-white p-4 w-full fixed bottom-0">
            <section>
                <Link href={'/checkout#resume'}>
                    <Paragraph
                        text={`${bundles} paquetes`}
                        className="font-medium hover:underline"
                    />
                </Link>

                <Paragraph
                    text="SELECCIONADOS"
                    className="text-[10px] font-medium"
                />
            </section>
            <aside>
                <Button
                    className="btn-primary"
                    onClick={() => router.push('checkout')}
                >
                    Terminar
                </Button>
            </aside>
        </footer>
    )
}

export default Footer
