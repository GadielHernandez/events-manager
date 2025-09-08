import React, { PropsWithChildren } from 'react'
import Card from '@/components/Common/Card'

type FormCardProps = {
    title: string
} & PropsWithChildren

const FormCard = ({ title, children }: FormCardProps) => {
    return (
        <Card>
            <header className="text-lg font-bold tracking-wide uppercase">
                {title}
            </header>
            {children}
        </Card>
    )
}

export default FormCard
