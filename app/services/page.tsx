import React from 'react'

import Bundles from '@/components/Bundles'
import { getCategories } from '@/lib/storage/services'

const NewContractPage = async () => {
    const categories = await getCategories()
    return <Bundles categories={categories.list} />
}

export default NewContractPage
