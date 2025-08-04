'use client'
import React from 'react'
import { createContract } from '@/lib/pdf/generation'
import Google from '@/lib/api/Google'

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
        console.log(formData)

        //await createContract(formData)}
        console.log(formData['EventDate'], formData['EventTime'])

        const [year, month, day] = formData['EventDate'].split('-').map(Number)
        const [hours, minutes] = formData['EventTime'].split(':').map(Number)
        console.log(
            year,
            month - 1,
            day,
            parseInt(hours as unknown as string),
            parseInt(minutes as unknown as string)
        )

        // Crear el Date usando la zona horaria local del navegador
        const eventDateTime = new Date(
            year,
            month - 1,
            day,
            parseInt(hours as unknown as string),
            parseInt(minutes as unknown as string)
        )
        console.log(eventDateTime)

        await Google.createEvent({
            ...formData,
            EventDateTime: eventDateTime.toISOString(),
        })
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
