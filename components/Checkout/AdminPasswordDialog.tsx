'use client'
import React, { useState } from 'react'
import Button from '../Common/Button'
import { LockClosedIcon } from '@heroicons/react/24/solid'

type AdminPasswordDialogProps = {
    id: string
    onSuccess: () => void
}

const AdminPasswordDialog = ({ id, onSuccess }: AdminPasswordDialogProps) => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/admin/verify-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            })

            const data = await response.json()

            if (data.success) {
                setPassword('')
                const dialog = document?.getElementById(id) as HTMLDialogElement
                dialog.close()
                onSuccess()
            } else {
                setError('Contraseña incorrecta')
            }
        } catch {
            setError('Error al verificar contraseña')
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setPassword('')
        setError('')
    }

    return (
        <dialog id={id} className="modal" onClose={handleClose}>
            <div className="modal-box text-center max-w-md rounded-2xl">
                <LockClosedIcon width={60} className="text-primary m-auto" />
                <h3 className="font-black text-2xl mt-4">
                    Configuración de Administrador
                </h3>
                <p className="text-sm py-4">
                    Ingresa la contraseña de administrador para continuar
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        autoFocus
                    />
                    {error && (
                        <p className="text-error text-sm mt-2">{error}</p>
                    )}
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
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <Button
                            type="submit"
                            className="btn-primary"
                            disabled={loading || !password}
                        >
                            {loading && (
                                <span className="loading loading-spinner"></span>
                            )}
                            {loading ? 'Verificando...' : 'Continuar'}
                        </Button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default AdminPasswordDialog
