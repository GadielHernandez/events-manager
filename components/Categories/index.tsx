import React from 'react'
import CategoryCard from './Card'
import { CategoryType } from '@/lib/storage/services/types'
import Title from '../Common/Typography/Title'
import Container from '../Common/Container'
import Header from '../Common/Header'
import Paragraph from '../Common/Typography/Paragraph'
import Footer from '../Footer'

type CategoriesPageProps = {
    categories: CategoryType[]
}

const CategoriesPage = ({ categories }: CategoriesPageProps) => {
    return (
        <>
            <Header className="flex bg-[url(/img/banner.jpeg)] min-h-48"></Header>
            <Container>
                <section className="mb-4 ">
                    <Title
                        text="Descrubre todos nuestros paquetes y servicios:"
                        size="lg"
                        weight="bold"
                    ></Title>
                    <Paragraph
                        className="text-sm"
                        text="¡Tú lo sueñas, nosotros lo hacemos realidad!"
                    />
                </section>
                <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            title={category.name}
                            subtitle={category.description}
                            img={category.img}
                        />
                    ))}
                </section>
            </Container>
            <Footer></Footer>
        </>
    )
}

export default CategoriesPage
