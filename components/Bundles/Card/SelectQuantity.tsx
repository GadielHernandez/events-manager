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
                    <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="select select-bordered w-full"
                    >
                        {Array.from({ length: max }, (_, i) => i + 1).map(
                            (n) => (
                                <option key={n} value={n}>
                                    {n} {unit}
                                </option>
                            )
                        )}
                    </select>
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
