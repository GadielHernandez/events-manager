'use client'

import React, { useState, useEffect } from 'react'
import Card from './Card'
import ServiceSelector from './Selector'
import Cart from '@/lib/storage/Cart'
import { BundleType, CategoryType } from '@/lib/storage/services/types'
import Category from '@/lib/api/Category'
import Counter from './Counter'

type ContainerBundlesType = {
    categories: CategoryType[]
}

const ContainerBundles = ({ categories = [] }: ContainerBundlesType) => {
    const [cart, setCart] = useState<Cart | null>(null)
    const [category, setCategory] = useState<CategoryType>(categories[0])
    const [bundles, setBundles] = useState<BundleType[]>([])

    useEffect(() => {
        setCart(new Cart())
    }, [])
    if (!cart) return null

    const onCategorySelected = async (categoryId: string) => {
        setBundles([])

        const category = categories.find((cat) => cat.id === categoryId)
        setCategory(category || categories[0])

        const bundles = await Category.getBundles(categoryId)
        setBundles(bundles)
    }

    return (
        <>
            <ServiceSelector
                onChangeCategory={onCategorySelected}
                categories={categories}
            />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                {bundles.map((bundle) => (
                    <Card
                        id={String(bundle.id)}
                        key={bundle.id}
                        title={bundle.name}
                        subtitle={bundle.description}
                        price={bundle.price}
                        category={category.name}
                        services={bundle.services}
                        cart={cart}
                    />
                ))}
            </div>
            <Counter cart={cart} />
        </>
    )
}

export default ContainerBundles
