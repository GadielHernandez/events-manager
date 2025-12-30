'use client'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Button from '../Common/Button'

type ConfirmDialogProps = {
    id: string
}

const ConfirmDialog = ({ id }: ConfirmDialogProps) => {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box text-center max-w-md rounded-2xl">
                <CheckCircleIcon width={60} className="text-red-500 m-auto" />
                <h3 className="font-black text-2xl mt-4">¡Ops!</h3>
                <p className="text-sm py-4">
                    Hubo un error al crear el contrato, vuelve a interarlo o
                    contactanos a info@todoconunsoloproveedor.com para contratar
                    tu evento
                </p>
                <div className="modal-action block">
                    <form method="dialog">
                        <Button className="btn-block btn-error text-white">
                            Entendido
                        </Button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmDialog
