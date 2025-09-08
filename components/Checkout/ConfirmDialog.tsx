'use client'
import Cart from '@/lib/storage/Cart'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React from 'react'
import Button from '../Common/Button'

type ConfirmDialogProps = {
    id: string
}

const ConfirmDialog = ({ id }: ConfirmDialogProps) => {
    const router = useRouter()
    const onClose = () => {
        Cart.clear()
        router.push('services')
    }
    return (
        <dialog id={id} className="modal">
            <div className="modal-box text-center max-w-md rounded-2xl">
                <CheckCircleIcon width={60} className="text-success m-auto" />
                <h3 className="font-black text-2xl mt-4">¡Listo!</h3>
                <p className="text-sm py-4">
                    Hemos recibido tu información y tu{' '}
                    <strong>solicitud</strong> ha sido creada, nos contactaremos
                    en brevedad para confirmar la fecha de tu evento y confirmar
                    el metodo de pago
                </p>
                <div className="modal-action block">
                    <form method="dialog">
                        <Button
                            className="btn-block btn-success text-white"
                            onClick={onClose}
                        >
                            Entendido
                        </Button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmDialog
