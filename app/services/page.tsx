import React, { Suspense } from 'react'

import Bundles from '@/components/Bundles'
import { getCategories } from '@/lib/storage/services'

const NewContractPage = async () => {
    const categories = await getCategories()
    return (
        <Suspense>
            <Bundles categories={categories.list} />
        </Suspense>
    )
}

export default NewContractPage
