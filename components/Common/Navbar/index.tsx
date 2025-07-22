import React, { PropsWithChildren } from 'react'

interface NavbarProps extends PropsWithChildren {
    className?: string
}

const Navbar = ({ className }: NavbarProps) => {
    return (
        <nav className={` bg-base-100 shadow-sm`}>
            <div className={`navbar ${className}`}>
                <div className="flex-1">
                    <a className="flex space-x-3 rtl:space-x-reverse">
                        <img src="/logo.png" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap tracking-tight">
                            Todo con un solo proveedor
                        </span>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
