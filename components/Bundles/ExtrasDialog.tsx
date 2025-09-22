'use client'
import React, { useState } from 'react'
import Button from '../Common/Button'
import Title from '../Common/Typography/Title'
import { ServiceType } from '@/lib/storage/services/types'

type ExtrasDialogProps = {
    service: ServiceType
    onClose?: (service?: ServiceType, activeIndex?: number) => void
}

const ExtrasDialog = ({ service, onClose }: ExtrasDialogProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleSelect = (index: number) => {
        setActiveIndex(index)
    }

    const handleAccept = () => {
        if (onClose && activeIndex !== null) {
            onClose(service, activeIndex) // pasamos la opción seleccionada
        } else if (onClose) {
            onClose()
        }
    }

    return (
        <dialog id="ExtrasDialog" className="modal" open>
            <div className="modal-box max-w-md rounded-2xl">
                <Title text="Selecciona una opción" size="2xl" weight="bold" />
                <p className="text-sm py-4">
                    Selecciona una de estas opciones, están incluidas en tu
                    paquete
                </p>
                <ul className="menu">
                    {service.options?.map((extra, i) => (
                        <li key={i}>
                            <button
                                type="button"
                                onClick={() => handleSelect(i)}
                                className={`border border-base-300 w-full text-left p-2 rounded-md transition 
                                    ${
                                        activeIndex === i
                                            ? 'bg-primary text-white'
                                            : ''
                                    }`}
                            >
                                {extra}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="modal-action block">
                    <Button
                        onClick={handleAccept}
                        className="btn-block btn-success text-white"
                        disabled={activeIndex === null}
                    >
                        Aceptar
                    </Button>
                </div>
            </div>
        </dialog>
    )
}

export default ExtrasDialog
