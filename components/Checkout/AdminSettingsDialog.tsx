'use client'
import React, { useState, useEffect } from 'react'
import Button from '../Common/Button'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useAdmin } from '@/contexts/AdminContext'
import Cart from '@/lib/storage/Cart'

type AdminSettingsDialogProps = {
    id: string
}

const AdminSettingsDialog = ({ id }: AdminSettingsDialogProps) => {
    const { settings, setSettings } = useAdmin()
    const [customDiscount, setCustomDiscount] = useState('')
    const [customAdvance, setCustomAdvance] = useState('')
    const [error, setError] = useState('')
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        // Calculate cart total
        const items = Cart.getItems()
        const total = items.reduce((sum, item) => {
            const itemTotal =
                item.quantity > 0 ? item.price * item.quantity : item.price
            return sum + itemTotal
        }, 0)
        setCartTotal(total)

        // Load current settings
        if (settings.customDiscount !== undefined) {
            setCustomDiscount(settings.customDiscount.toString())
        }
        if (settings.customAdvance !== undefined) {
            setCustomAdvance(settings.customAdvance.toString())
        }
    }, [settings])

    const handleApply = () => {
        setError('')

        const discount = customDiscount ? parseFloat(customDiscount) : undefined
        const advance = customAdvance ? parseFloat(customAdvance) : undefined

        // Validation
        if (discount !== undefined) {
            if (isNaN(discount) || discount < 0) {
                setError('El descuento debe ser un número positivo')
                return
            }
            if (discount > cartTotal) {
                setError('El descuento no puede exceder el total del carrito')
                return
            }
        }

        if (advance !== undefined) {
            if (isNaN(advance) || advance < 0) {
                setError('El anticipo debe ser un número positivo')
                return
            }
        }

        setSettings({
            customDiscount: discount,
            customAdvance: advance,
        })

        const dialog = document?.getElementById(id) as HTMLDialogElement
        dialog.close()
    }

    const handleClose = () => {
        setError('')
        // Reset to current settings
        if (settings.customDiscount !== undefined) {
            setCustomDiscount(settings.customDiscount.toString())
        } else {
            setCustomDiscount('')
        }
        if (settings.customAdvance !== undefined) {
            setCustomAdvance(settings.customAdvance.toString())
        } else {
            setCustomAdvance('')
        }
    }

    const currency = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    })

    return (
        <dialog id={id} className="modal" onClose={handleClose}>
            <div className="modal-box max-w-md rounded-2xl">
                <Cog6ToothIcon width={60} className="text-primary m-auto" />
                <h3 className="font-black text-2xl mt-4 text-center">
                    Configuración de Administrador
                </h3>
                <p className="text-sm py-4 text-center">
                    Configura descuentos y anticipos personalizados
                </p>
                <p className="text-sm font-semibold mb-4">
                    Total del carrito: {currency.format(cartTotal)}
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">
                                Descuento personalizado (MXN)
                            </span>
                        </label>
                        <input
                            type="number"
                            placeholder="Opcional"
                            className="input input-bordered w-full"
                            value={customDiscount}
                            onChange={(e) => setCustomDiscount(e.target.value)}
                            min="0"
                            step="0.01"
                        />
                        <label className="label">
                            <span className="label-text-alt text-base-content/60">
                                Dejar vacío para usar código de descuento
                            </span>
                        </label>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">
                                Anticipo personalizado (MXN)
                            </span>
                        </label>
                        <input
                            type="number"
                            placeholder="Opcional"
                            className="input input-bordered w-full"
                            value={customAdvance}
                            onChange={(e) => setCustomAdvance(e.target.value)}
                            min="0"
                            step="0.01"
                        />
                        <label className="label">
                            <span className="label-text-alt text-base-content/60">
                                Dejar vacío para cálculo automático
                            </span>
                        </label>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            <span className="text-sm">{error}</span>
                        </div>
                    )}
                </div>

                <div className="modal-action">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => {
                            const dialog = document?.getElementById(
                                id
                            ) as HTMLDialogElement
                            dialog.close()
                        }}
                    >
                        Cancelar
                    </button>
                    <Button
                        type="button"
                        className="btn-primary"
                        onClick={handleApply}
                    >
                        Aplicar
                    </Button>
                </div>
            </div>
        </dialog>
    )
}

export default AdminSettingsDialog
