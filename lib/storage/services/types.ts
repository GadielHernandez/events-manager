export type CategoryList = {
    list: CategoryType[]
}

export type CategoryType = {
    id: string
    name: string
}

export type ServiceType = {
    name: string
    details: string
}

export type ServiceJsonType = {
    name: string
    details: string
    category: string
    bundles: string[]
}

export type BundleJsonType = {
    id: string
    name: string
    description: string
    price: number
    services: ServiceType[]
}

export type BundleType = {
    services: ServiceType[]
} & BundleJsonType
