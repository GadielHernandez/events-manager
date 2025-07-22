import React, { PropsWithChildren } from 'react'
import Card from '@/components/Common/Card'

type FormCardProps = {
    title: string
} & PropsWithChildren

const FormCard = ({ title, children }: FormCardProps) => {
    return (
        <Card>
            <header className="text-xl font-semibold tracking-wide">
                {title}
            </header>
            {children}
        </Card>
    )
}

export default FormCard
