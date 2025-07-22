'use client'

import React from 'react'
import Title from '@/components/Common/Typography/Title'
import TabGroup from './TabGroup'
import { CategoryType } from '@/lib/storage/services/types'

type ServiceSelectorProps = {
    onChangeCategory: (categoryId: string) => void
    categories: CategoryType[]
} & React.HTMLAttributes<HTMLDivElement>

const ServiceSelector = ({
    onChangeCategory,
    categories,
}: ServiceSelectorProps) => {
    const onChage = (categoryId: string) => {
        onChangeCategory(categoryId)
    }
    return (
        <>
            <Title
                level="h1"
                text="Consulta todos nuestros servicios"
                subtitle="Selecciona los paquetes que deseas contratar"
                className="my-4"
            />
            <TabGroup categories={categories} onChange={onChage} />
        </>
    )
}

export default ServiceSelector
