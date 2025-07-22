import React from 'react'
import BaseCard from './BaseCard'
import InputField from '@/components/Common/DataInput/InputField'

const PartyData = () => {
    return (
        <BaseCard title="Festejados">
            <InputField
                name="Celebrated"
                legend="Nombre(s)"
                label="Quinceañera, Novios, etc"
                required={true}
            />
        </BaseCard>
    )
}

export default PartyData
