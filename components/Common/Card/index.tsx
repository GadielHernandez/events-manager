import React from 'react'

type CardProps = {
    children: React.ReactNode
    className?: string
} & React.HtmlHTMLAttributes<HTMLDivElement>

const Card = ({ children, className, ...htmlProps }: CardProps) => {
    return (
        <article
            className="card bg-base-100 shadow-sm rounded-xl"
            {...htmlProps}
        >
            <section className={`card-body ${className}`}>{children}</section>
        </article>
    )
}

export default Card
