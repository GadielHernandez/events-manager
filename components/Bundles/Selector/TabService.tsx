'use client'

import React from 'react'

type TabServiceProps = {
    text: string
    value: string
    selectedValue: string
    onChange: (value: string) => void
} & React.HtmlHTMLAttributes<HTMLInputElement>

const TabService = ({
    text,
    value,
    selectedValue,
    onChange,
}: TabServiceProps) => {
    const isSelected = value === selectedValue

    return (
        <input
            type="radio"
            name="my_tabs_1"
            className={`tab p-3 rounded-2xl! ${
                isSelected
                    ? 'bg-primary! text-base-100 hover:text-primary-content'
                    : ''
            }`}
            aria-label={text}
            value={value}
            checked={isSelected}
            onChange={() => onChange(value)}
        />
    )
}

export default TabService
