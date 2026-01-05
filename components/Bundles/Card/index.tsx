import React, { useEffect, useState } from 'react'
import Card from '@/components/Common/Card'
import Title from '@/components/Common/Typography/Title'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ServiceType } from '@/lib/storage/services/types'
import SelectButton from './SelectButton'
import Cart from '@/lib/storage/Cart'
import ExtrasDialog from '../ExtrasDialog'
import MenuExtras from './MenuExtras'
import SelectQuantity from './SelectQuantity'

type BundleCardProps = {
    id: string
    title: string
    subtitle: string
    price: number
    category: string
    categoryId: string
    quantity?: { max: number; unit: string }
    services: ServiceType[]
    disabled?: boolean
    cart: typeof Cart
    change?: (selectedId: string | null) => void
}

const BundleCard = ({
    id,
    title,
    price,
    category,
    categoryId,
    services,
    subtitle,
    disabled = false,
    quantity,
    cart,
    change,
}: BundleCardProps) => {
    const currency = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    })

    const [dialogQueue, setDialogQueue] = useState<ServiceType[]>([])
    const [extrasSelected, setExtrasSelected] = useState<string[]>([])
    const [currentExtras, setCurrentExtras] = useState<ServiceType | null>(null)

    const [showQuantityDialog, setShowQuantityDialog] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState<number | null>(
        null
    )

    const onSelectItem = (selected: boolean) => {
        if (!selected) {
            cart.removeItem(id)
            setExtrasSelected([])
            setSelectedQuantity(null)
            if (change) change(null)
            return
        }

        startQuantityDialog()
    }

    const startQuantityDialog = () => {
        if (!quantity) {
            console.log('START EXTRAS FLOW')

            startExtrasFlow()
            return
        }

        setShowQuantityDialog(true)
    }

    const startExtrasFlow = () => {
        const extrasServices = services.filter((s) => s.options)

        if (extrasServices.length > 0) {
            setDialogQueue(extrasServices)
            setCurrentExtras(extrasServices[0])
            setExtrasSelected([])
        } else {
            addToCart()
        }

        if (change) change(id)
    }

    const addToCart = () => {
        cart.addItem({
            id,
            name: title,
            price,
            category,
            categoryId,
            quantity: selectedQuantity ?? -1,
            extras: extrasSelected.length > 0 ? extrasSelected : undefined,
        })
    }

    const handleQuantityConfirm = (qty: number) => {
        setSelectedQuantity(qty)
        setShowQuantityDialog(false)
    }

    const handleDialogClose = (service?: ServiceType, selected?: number) => {
        if (service && selected !== undefined && service.options) {
            const optionSelected =
                service.options[selected].length > 60
                    ? service.options[selected].substring(0, 45) + '...'
                    : service.options[selected]

            setExtrasSelected((prev) => [...prev, optionSelected])
        }

        if (dialogQueue.length === 1) {
            setDialogQueue([])
            setCurrentExtras(null)
            return
        }

        const [, ...rest] = dialogQueue
        setDialogQueue(rest)
        setCurrentExtras(rest[0])
    }

    useEffect(() => {
        if (selectedQuantity !== null) {
            startExtrasFlow()
        }
    }, [selectedQuantity])

    useEffect(() => {
        if (
            dialogQueue.length === 0 &&
            currentExtras === null &&
            extrasSelected.length > 0
        ) {
            addToCart()
        }
    }, [dialogQueue, currentExtras, extrasSelected])

    return (
        <Card id={id}>
            <span className="badge badge-warning">{category}</span>

            <Title
                size="2xl"
                text={title}
                subtitle={subtitle}
                className="my-3"
            />

            {price && (
                <p className="text-4xl font-semibold max-h-fit">
                    {currency.format(price)}
                    <span className="text-2xl text-base-content/50"> MXN</span>
                </p>
            )}

            {selectedQuantity && quantity && (
                <p className="mt-2 text-sm opacity-70">
                    Incluye {selectedQuantity} {quantity.unit}
                </p>
            )}

            <SelectButton
                onSelect={onSelectItem}
                initialStatus={cart.getItem(id) !== undefined}
                disabled={disabled}
            />

            <ul className="list mb-auto pt-4">
                {services.map((service, index) => (
                    <li key={index} className="list-row p-2">
                        <CheckCircleIcon className="size-6 me-2 inline-block text-success" />
                        <div>
                            <p>{service.name} Cambio</p>
                            {service.options && (
                                <div className="text-xs font-semibold opacity-60">
                                    {service.options.length} opciones
                                    disponibles
                                </div>
                            )}
                        </div>
                        {service.options && (
                            <MenuExtras options={service.options} />
                        )}
                    </li>
                ))}
            </ul>

            {/* Extras */}
            {currentExtras && (
                <ExtrasDialog
                    service={currentExtras}
                    onClose={handleDialogClose}
                />
            )}

            {/* Quantity */}
            {quantity && (
                <SelectQuantity
                    unit={quantity.unit}
                    max={quantity.max}
                    open={showQuantityDialog}
                    onClose={() => setShowQuantityDialog(false)}
                    onConfirm={handleQuantityConfirm}
                />
            )}
        </Card>
    )
}

export default BundleCard
