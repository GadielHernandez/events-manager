'use client'

import React, { useState } from 'react'
import Button from '@/components/Common/Button'

type SelectButtonProps = {
    onSelect: (selected: boolean) => void
    disabled: boolean
    initialStatus: boolean
}

const SelectButton = ({
    onSelect,
    initialStatus,
    disabled,
}: SelectButtonProps) => {
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
            disabled={disabled}
            color={selected ? 'primary-content' : 'primary'}
            modifier="block"
            className={`my-3 ${selected && selectedClasses}`}
            onClick={onItemSelected}
        >
            {selected ? 'Remover' : 'Seleccionar'}
        </Button>
    )
}

export default SelectButton
