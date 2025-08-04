'use client'

import React, { useState, useEffect } from 'react'
import TabService from './TabService'
import { CategoryType } from '@/lib/storage/services/types'

type TabGroupProps = {
    categories: CategoryType[]
    onChange: (categoryId: string) => void
    initial: string | undefined
}

const TabGroup = ({ categories, onChange, initial }: TabGroupProps) => {
    const [selected, setSelected] = useState(initial)

    const onTabSelected = (categoryId: string) => {
        setSelected(categoryId)
        onChange(categoryId)
    }

    return (
        <section className="carousel carousel-center my-3 px-0 bg-base-300 inset-shadow-sm rounded-xl w-full space-x-3">
            <div className="carousel-item tabs-box py-1 bg-base-300">
                {categories.map((category) => (
                    <div
                        className="carousel-item tabs-box py-1 bg-base-300"
                        key={category.id}
                    >
                        <TabService
                            text={category.name}
                            value={category.id}
                            selectedValue={selected}
                            onChange={(value) => {
                                onTabSelected(value as string)
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TabGroup
