import React from 'react'

type ParagraphProps = {
    className?: string
    text: React.ReactNode
} & React.HTMLAttributes<HTMLParagraphElement>

const Paragraph = ({
    className,
    text,
    ...ParagraphAttributes
}: ParagraphProps) => {
    return (
        <p className={`text-base ${className}`.trim()} {...ParagraphAttributes}>
            {text}
        </p>
    )
}

export default Paragraph
