'use client'

import React, { PropsWithChildren } from 'react'
import SubmitButton from '../Common/Form/SubmitButton'
import { createContract } from '@/lib/pdf/generation'

type ContractGeneratorProps = {} & PropsWithChildren

const ContractGenerator = (props: ContractGeneratorProps) => {
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
