import React, { CSSProperties, PropsWithChildren } from 'react'

type HeaderProps = {
    className?: string
    style?: CSSProperties
    overlay?: boolean
} & PropsWithChildren

const Header = ({
    children,
    className,
    style,
    overlay = false,
}: HeaderProps) => {
    return (
        <div
            className={`relative -z-10 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto bg-contain bg-fixed ${className}`}
            style={style}
        >
            {overlay && <div className="-z-10 absolute inset-0 bg-black/50" />}
            {children}
        </div>
    )
}

export default Header
