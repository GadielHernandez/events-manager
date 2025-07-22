import Cart, { CartItem } from '@/lib/storage/Cart'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CounterProps extends PropsWithChildren {
    cart: Cart
}

const Counter = ({ cart }: CounterProps) => {
    const router = useRouter()

    const [bundles, setBundles] = useState(0)
    const onChangNotify = (items: Map<string, CartItem>) => {
        setBundles(items.size)
    }
    useEffect(() => {
        setBundles(cart.getItems().length)
        cart.addChangeCallback(onChangNotify)
    }, [])
    return (
        <nav className="fixed flex bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-4 max-w-screen-xl mx-auto">
            <div className="navbar rounded-2xl min-w-full z-50 bg-base-100 w-96 max-w-screen-xl mx-auto shadow-lg shadow-primary-500/50 ">
                <div className="flex-1">
                    <div className="stat">
                        <div className="stat-value text-primary text-xl">
                            {bundles}
                        </div>
                        <div className="stat-desc">
                            paquete(s) seleccionado(s)
                        </div>
                    </div>
                </div>
                <div className="flex-none p-4 ">
                    <button
                        className="btn btn-primary md:btn-md sm:btn-sm "
                        onClick={() => router.push('checkout')}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Counter
