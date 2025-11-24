import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'

const InstFont = Instrument_Sans({
    variable: '--font-inst',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Todo con un solo proveedor',
    description:
        'Proveedor integral de servicios para todo tipo de eventos en Monterrey. Encuentra paquetes completos para bodas, XV años, graduaciones, corporativos y fiestas privadas. Fotografía, video, cabinas, decoración, música y más en un solo lugar.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="bg-base-100" data-theme="corporate">
            <body className={`${InstFont.className}  antialiased `}>
                {/* <Navbar className={containerClasses} /> */}
                {children}
            </body>
        </html>
    )
}
