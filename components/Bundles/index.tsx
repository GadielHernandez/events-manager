'use client'

import React, { useState, useEffect, use } from 'react'
import Card from './Card'
import ServiceSelector from './Selector'
import Cart from '@/lib/storage/Cart'
import { BundleType, CategoryType } from '@/lib/storage/services/types'
import Category from '@/lib/api/Category'
import Counter from './Counter'
import { useSearchParams } from 'next/navigation'

type ContainerBundlesType = {
    categories: CategoryType[]
}

const ContainerBundles = ({ categories = [] }: ContainerBundlesType) => {
    const [cart, setCart] = useState<Cart | null>(null)
    const [category, setCategory] = useState<CategoryType>(categories[0])
    const [bundles, setBundles] = useState<BundleType[]>([])
    const [selectedBundle, setSelectedBundle] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const initialCategory =
        categories.find(
            (category) => category.id === searchParams.get('category')
        ) || categories[0]

    const onCategorySelected = async (categoryId: string) => {
        const listBundlesSelected = cart?.getItemsCategory(categoryId)

        if (listBundlesSelected && listBundlesSelected.length > 0)
            setSelectedBundle(listBundlesSelected[0].id)
        else setSelectedBundle(null)

        const selectedCategory = categories.find((cat) => cat.id === categoryId)
        setCategory(selectedCategory || categories[0])

        const listBundles = await Category.getBundles(categoryId)
        setBundles(listBundles)
    }

    const onChangeSelected = (selectedId: string | null) => {
        setSelectedBundle(selectedId)
    }

    useEffect(() => {
        setCart(new Cart())
    }, [])

    useEffect(() => {
        onCategorySelected(initialCategory.id)
    }, [cart])
    if (!cart) return

    return (
        <>
            <ServiceSelector
                onChangeCategory={onCategorySelected}
                categories={categories}
                initial={initialCategory.id}
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
                        categoryId={category.id}
                        services={bundle.services}
                        disabled={
                            selectedBundle !== null &&
                            selectedBundle !== bundle.id
                        }
                        cart={cart}
                        change={onChangeSelected}
                    />
                ))}
            </div>
            <Counter cart={cart} />
        </>
    )
}

export default ContainerBundles
