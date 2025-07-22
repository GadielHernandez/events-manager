import React, { PropsWithChildren } from 'react'
import Navbar from '@/components/Common/Navbar'

interface ServicesLayoutProps extends PropsWithChildren {}

const LayoutServices = ({ children }: ServicesLayoutProps) => {
    return <>{children}</>
}

export default LayoutServices
