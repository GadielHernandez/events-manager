import React from 'react'

type CardProps = {
    children: React.ReactNode
    className?: string
} & React.HtmlHTMLAttributes<HTMLDivElement>

const Card = ({ children, className, ...htmlProps }: CardProps) => {
    return (
        <article
            className="card bg-base-100 shadow-sm rounded-2xl"
            {...htmlProps}
        >
            <section className={`card-body p-3`}>{children}</section>
        </article>
    )
}

export default Card
