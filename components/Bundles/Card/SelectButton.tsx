'use client'

import React, { useState } from 'react'
import Button from '@/components/Common/Button'

type SelectButtonProps = {
    onSelect: (selected: boolean) => void
    initialStatus: boolean
}

const SelectButton = ({ onSelect, initialStatus }: SelectButtonProps) => {
    const [selected, setSelected] = useState(initialStatus)

    const onItemSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
        const Card = event.currentTarget.closest('article.card')
        if (selected) {
            Card?.classList.remove('border-t-4')
            Card?.classList.remove('border-primary')
        } else {
            Card?.classList.add('border-t-4')
            Card?.classList.add('border-primary')
        }

        if (Card?.id) onSelect(!selected)
        setSelected((prev) => !prev)
    }

    const selectedClasses = 'outline-2 outline-primary'
    return (
        <Button
            color={selected ? 'neutral' : 'primary'}
            modifier="block"
            className={`my-3 ${selected && selectedClasses}`}
            onClick={onItemSelected}
        >
            {selected ? 'Quitar' : 'Seleccionar'}
        </Button>
    )
}

export default SelectButton
