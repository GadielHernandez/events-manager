'use client'

import React, { useState, useEffect } from 'react'
import Card from './Card'
import Cart from '@/lib/storage/Cart'
import { BundleType, CategoryType } from '@/lib/storage/services/types'
import Category from '@/lib/api/Category'
import { useRouter, useSearchParams } from 'next/navigation'
import Container from '../Common/Container'
import Header from '../Common/Header'
import Paragraph from '../Common/Typography/Paragraph'
import Title from '../Common/Typography/Title'
import Footer from '../Footer'
import Button from '../Common/Button'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

type ContainerBundlesType = {
    categories: CategoryType[]
}

const ContainerBundles = ({ categories = [] }: ContainerBundlesType) => {
    const router = useRouter()

    const [category, setCategory] = useState<CategoryType>(categories[0])
    const [bundles, setBundles] = useState<BundleType[]>([])

    const searchParams = useSearchParams()
    const selectedCategory =
        categories.find(
            (category) => category.id === searchParams.get('category')
        ) || categories[0]

    const setCategorySelected = async (categoryId: string) => {
        const selectedCategory = categories.find((cat) => cat.id === categoryId)
        setCategory(selectedCategory || categories[0])

        const listBundles = await Category.getBundles(categoryId)
        setBundles(listBundles)
    }

    const onItemSelected = () => {
        router.push('/')
    }

    useEffect(() => {
        setCategorySelected(selectedCategory.id)
    }, [])

    return (
        <>
            <Button
                className="absolute top-5 left-5 btn-xs z-50"
                onClick={onItemSelected}
            >
                <ChevronLeftIcon className="w-3" />
                Ver categorias
            </Button>
            <Header
                overlay={true}
                className="flex min-h-52 text-white"
                style={{
                    backgroundImage: `url(/img/categories/${category.id}.webp)`,
                }}
            >
                <section className="m-auto pb-2 text-center text-shadow-lg z-10">
                    <Title
                        text={category.name}
                        size="2xl"
                        weight="bold"
                    ></Title>
                    <Paragraph
                        text={category.description}
                        className="text-sm"
                    />
                </section>
            </Header>
            <Container>
                <section className="mb-4">
                    <Paragraph text="Selecciona el paquete que deseas contratar:" />
                </section>
                <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
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
                            cart={Cart}
                        />
                    ))}
                </section>
            </Container>
            <Footer></Footer>
        </>
    )
}

export default ContainerBundles
