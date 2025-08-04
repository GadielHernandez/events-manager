'use client'
import React from 'react'

type ButtonColor =
    | 'primary'
    | 'neutral'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'primary-content'

type ButtonStyle = 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
type ButtonBehaivor = 'active' | 'disabled'
type ButtonModifier = 'wide' | 'block' | 'square' | 'circle'

export type ButtonProps = {
    children: React.ReactNode
    color?: ButtonColor
    style?: ButtonStyle
    behaivor?: ButtonBehaivor
    modifier?: ButtonModifier
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
    children,
    color,
    style,
    behaivor,
    modifier,
    className,
    ...props
}: ButtonProps) => {
    const classes = [
        'rounded-xl',
        'btn',
        color && `btn-${color}`,
        style && `btn-${style}`,
        behaivor && `btn-${behaivor}`,
        modifier && `btn-${modifier}`,
        className,
    ].join(' ')

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}

export default Button
