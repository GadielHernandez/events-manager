import React from 'react'
type ListItemProps = {
    category: string
    name: string
    price: string
}
const ListItem = ({ category, name, price }: ListItemProps) => {
    return (
        <li className="list-row">
            <article className="list-col-grow">
                <header>{name}</header>
                <p className="text-xs uppercase font-semibold opacity-60">
                    {category}
                </p>
            </article>
            <aside className="font-medium">{price}</aside>
        </li>
    )
}

export default ListItem
