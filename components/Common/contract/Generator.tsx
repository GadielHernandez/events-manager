'use client'

import React from 'react'
import SubmitButton from '../Form/SubmitButton'
import { createContract } from '@/lib/pdf/generation'

const ContractGenerator = () => {
    const handleSubmitData = (values: Record<string, FormDataEntryValue>) => {
        createContract(values)
    }

    return (
        <SubmitButton color="primary" onSubmitData={handleSubmitData}>
            Contratar
        </SubmitButton>
    )
}

export default ContractGenerator
