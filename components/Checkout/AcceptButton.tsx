'use client'
import React, { useState } from 'react'
import Checkout from '@/lib/api/Checkout'
import Button from '../Common/Button'

type AcceptButtonProps = {
    confirmDialog: string
    errorDialog: string
}

const AcceptButton = ({ confirmDialog, errorDialog }: AcceptButtonProps) => {
    const [loading, setLoading] = useState(false)
    const onClick = async () => {
        setLoading(true)
        const form = document.getElementById('event-data')
        if (!form) return

        const formData: Record<string, string> = {}
        const inputs = form.querySelectorAll('input, select, textarea')

        inputs.forEach((input) => {
            const el = input as HTMLInputElement

            const name = el.name
            const value = el.value
            const isRequired = el.required

            if (isRequired && !value.trim()) {
                el.classList.add('input-error')
                el.reportValidity?.()
                setLoading(false)
                throw new Error('Invalid data')
            }
            formData[name] = value
        })

        const [year, month, day] = formData['EventDate'].split('-').map(Number)
        const [hours, minutes] = formData['EventTime'].split(':').map(Number)

        // Crear el Date usando la zona horaria local del navegador
        const eventDateTime = new Date(
            year,
            month - 1,
            day,
            parseInt(hours as unknown as string),
            parseInt(minutes as unknown as string)
        )
        const codeDiscount = document
            .getElementById('codeDiscount')
            ?.getAttribute('value')

        const response = await Checkout.createPrecontact({
            ...formData,
            EventDateTime: eventDateTime.toISOString(),
            CodeDiscount: codeDiscount || '',
        })

        if (response?.error) {
            const dialog = document?.getElementById(
                errorDialog
            ) as HTMLDialogElement
            dialog.showModal()
            setLoading(false)
            return
        }

        const dialog = document?.getElementById(
            confirmDialog
        ) as HTMLDialogElement
        dialog.showModal()
        setLoading(false)
    }
    return (
        <>
            <Button
                className="btn-block btn-primary my-4 "
                onClick={onClick}
                disabled={loading}
            >
                {loading && <span className="loading loading-spinner"></span>}
                {loading ? ' Enviando' : 'Solicitar contrato'}
            </Button>
            <p className="text-center text-sm p-4 pt-0 text-base-content/80">
                Al solicitar tu contrato, recibiremos tu información y te
                contactaremos en brevedad para confirmar tu{' '}
                <strong>metodo de pago</strong> y hacer la{' '}
                <strong>confirmación</strong> de la fecha de tu evento
            </p>
        </>
    )
}

export default AcceptButton
