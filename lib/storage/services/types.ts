export type CategoryList = {
    list: CategoryType[]
}

export type CategoryType = {
    id: string
    name: string
    description: string
    img: string
}

export type ServiceType = {
    name: string
    details: string
    options?: string[]
}

export type ServiceJsonType = {
    name: string
    details: string
    category: string
    bundles: string[]
    options?: string[]
}

export type BundleJsonType = {
    id: string
    name: string
    description: string
    price: number
    services: ServiceType[]
    extras: string[]
    quantity?: {
        max: number
        unit: string
    }
}

export type BundleType = {
    services: ServiceType[]
} & BundleJsonType
