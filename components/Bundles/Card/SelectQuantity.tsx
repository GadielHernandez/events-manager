'use client'

import Button from '@/components/Common/Button'
import React, { useState } from 'react'

type SelectQuantityProps = {
    unit: string
    max: number
    open: boolean
    onClose: () => void
    onConfirm: (quantity: number) => void
}

const SelectQuantity = ({
    unit,
    max,
    open,
    onClose,
    onConfirm,
}: SelectQuantityProps) => {
    const [quantity, setQuantity] = useState(1)

    const handleConfirm = () => {
        onConfirm(quantity)
        onClose()
    }

    if (!open) return null

    return (
        <dialog className="modal modal-open">
            <div className="modal-box rounded-2xl">
                <h3 className="font-bold text-lg">Selecciona la cantidad</h3>

                <p className="text-sm opacity-70 mt-2">
                    ¿Cuántos {unit} deseas incluir en tu paquete?
                </p>

                <div className="mt-6">
                    <input
                        type="number"
                        min={1}
                        max={max}
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(
                                Math.min(
                                    max,
                                    Math.max(1, Number(e.target.value))
                                )
                            )
                        }
                        className="input input-bordered w-full"
                    />
                    <p className="text-xs opacity-60 mt-1">
                        Máximo permitido: {max} {unit}
                    </p>
                </div>

                <div className="modal-action">
                    <Button className="btn-ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        className="btn-success text-white"
                        onClick={handleConfirm}
                    >
                        Aceptar
                    </Button>
                </div>
            </div>

            {/* click fuera */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}

export default SelectQuantity
