'use client'
import React from 'react'
import { createContract } from '@/lib/pdf/generation'
import Paragraph from '../Common/Typography/Paragraph'

const AcceptButton = () => {
    const onClick = async () => {
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
                throw new Error('Invalid data')
            }
            formData[name] = value
        })

        await createContract(formData)
    }
    return (
        <>
            <button
                className="btn btn-block btn-primary my-4"
                onClick={onClick}
            >
                Pre-contratar
            </button>
            <p className="text-center text-sm p-4 pt-0 text-base-content/80">
                Al crear este pre-contrato, recibiremos tu información y te
                contactaremos en brevedad para confirmar tu{' '}
                <strong>metodo de pago</strong> y hacer la{' '}
                <strong>confirmación</strong> de la fecha de tu evento
            </p>
        </>
    )
}

export default AcceptButton
