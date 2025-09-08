import React from 'react'
import Card from '@/components/Common/Card'
import Title from '@/components/Common/Typography/Title'
import Paragraph from '@/components/Common/Typography/Paragraph'
import Button from '@/components/Common/Button'
import Link from 'next/link'

type CategoryCardProps = {
    id: string
    title: string
    img: string
    subtitle: string
}

const CategoryCard = ({ id, title, img, subtitle }: CategoryCardProps) => {
    const imgURL = `/img/categories/${img}`
    return (
        <Card id={id} key={id}>
            <div
                className="min-h-40 bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${imgURL})` }}
            />
            <Title size="xl" text={title} weight="medium" />
            <Paragraph
                text={subtitle}
                className="text-base-content/50 text-sm"
            ></Paragraph>
            <Link href={`/services?category=${id}`} className="ml-auto">
                <Button className="btn-neutral">Ver paquetes</Button>
            </Link>
        </Card>
    )
}

export default CategoryCard
