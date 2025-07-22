import React from 'react'

const DEFAULT_LEVEL = 'h1'
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TitleProps = {
    level?: HeadingLevel
    text: string
    subtitle?: React.ReactNode
    className?: string
    size?: string
    weight?: string
}

const sizeLevels: Record<HeadingLevel, string> = {
    h1: '4xl',
    h2: '3xl',
    h3: '2xl',
    h4: 'xl',
    h5: 'lg',
    h6: 'base',
}

const weightLevels: Record<HeadingLevel, string> = {
    h1: 'bold',
    h2: 'semibold',
    h3: 'semibold',
    h4: 'medium',
    h5: 'medium',
    h6: 'medium',
}

const Title = ({
    level = DEFAULT_LEVEL,
    text,
    className = '',
    size,
    weight,
    subtitle,
}: TitleProps) => {
    const sizeClass = size ? `text-${size}` : `text-${sizeLevels[level]}`
    const weightClass = weight
        ? `font-${weight}`
        : `font-${weightLevels[level]}`
    const classesNames = `${sizeClass} ${weightClass}`.trim()

    const Tag = level as keyof React.JSX.IntrinsicElements

    return (
        <div className={className}>
            <Tag className={`${classesNames} tracking-tight mb-1`}>{text}</Tag>
            {subtitle && (
                <p className="ml-1 text-base text-base-content/50 tracking-tight ">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default Title
