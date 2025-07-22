'use client'

import React from 'react'
import Button, { ButtonProps } from '@/components/Common/Button'

type SubmitButtonProps = {
    onSubmitData?: (values: Record<string, FormDataEntryValue>) => void
} & ButtonProps

const SubmitButton = ({
    onSubmitData,
    children,
    ...buttonProps
}: SubmitButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const form = event.currentTarget.closest('form')
        if (!form) return

        const formData = new FormData(form)
        const values = Object.fromEntries(formData.entries())

        onSubmitData?.(values)
    }

    return (
        <Button onClick={handleClick} {...buttonProps}>
            {children || 'Enviar'}
        </Button>
    )
}

export default SubmitButton
