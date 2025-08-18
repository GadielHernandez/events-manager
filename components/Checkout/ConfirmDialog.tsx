'use client'
import Cart from '@/lib/storage/Cart'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React from 'react'

type ConfirmDialogProps = {
    id: string
}

const ConfirmDialog = ({ id }: ConfirmDialogProps) => {
    const router = useRouter()
    const onClose = () => {
        const cart = new Cart()
        cart.clear()
        router.push('services')
    }
    return (
        <dialog id={id} className="modal">
            <div className="modal-box text-center max-w-md">
                <CheckCircleIcon width={60} className="text-success m-auto" />
                <h3 className="font-black text-2xl mt-4">¡Listo!</h3>
                <p className="text-sm py-4">
                    Hemos recibido tu información y tu{' '}
                    <strong>pre-contrato</strong> ha sido creado, nos
                    contactaremos en brevedad para confirmar la fecha de tu
                    evento y confirmar el metodo de pago
                </p>
                <div className="modal-action block">
                    <form method="dialog">
                        <button
                            className="btn btn-block btn-success text-white"
                            onClick={onClose}
                        >
                            Entendido
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmDialog
