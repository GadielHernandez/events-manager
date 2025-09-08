import { PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

type ListItemProps = {
    category: string
    name: string
    price: string
    categoryId: string
}
const ListItem = ({ category, name, price, categoryId }: ListItemProps) => {
    const categoryURL = `/services?category=${categoryId}`
    return (
        <li className="list-row">
            <Link href={categoryURL}>
                <button className="btn btn-square btn-ghost px-0">
                    <PencilIcon className="w-4" />
                </button>
            </Link>
            <article className="list-col-grow">
                <header>{name}</header>
                <p className="text-xs uppercase font-semibold opacity-60">
                    {category}
                </p>
            </article>
            <aside className="font-medium m-auto">{price}</aside>
        </li>
    )
}

export default ListItem
