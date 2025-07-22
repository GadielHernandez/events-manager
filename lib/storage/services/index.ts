import fs from 'fs/promises'
import path from 'path'
import {
    CategoryList,
    BundleType,
    BundleJsonType,
    ServiceJsonType,
} from './types'

const STORAGE_PATH = 'lib/storage/data/'

export const getCategories = async () => {
    try {
        // Ruta relativa al archivo JSON
        const filePath = path.join(
            process.cwd(),
            STORAGE_PATH,
            'categories.json'
        )

        // Leer archivo como string
        const fileContent = await fs.readFile(filePath, 'utf-8')

        // Parsear JSON
        const data = JSON.parse(fileContent) as CategoryList

        return data
    } catch (error) {
        console.error(`❌ Error leyendo las categorias:`, error)
        return { list: [] } as CategoryList
    }
}

export async function getBundlesByCategory(
    categoryId: string
): Promise<BundleType[]> {
    try {
        // Ruta relativa al archivo JSON
        const filePath = path.join(
            process.cwd(),
            STORAGE_PATH,
            categoryId,
            'bundles.json'
        )

        // Leer archivo como string
        const fileContent = await fs.readFile(filePath, 'utf-8')

        const services = await getServicesByCategory(categoryId)

        // Parsear JSON
        const bundles = JSON.parse(fileContent) as BundleJsonType[]
        bundles.forEach((bundle) => {
            services.forEach((service) => {
                if (service.bundles.includes(bundle.id)) {
                    if (!bundle.services || bundle.services.length === 0) {
                        bundle.services = [service]
                        return
                    }
                    bundle.services.push(service)
                }
            })
        })

        return bundles
    } catch (error) {
        console.error(
            `❌ Error leyendo bundles de la categoría ${categoryId}:`,
            error
        )
        return []
    }
}

export async function getServicesByCategory(
    categoryId: string
): Promise<ServiceJsonType[]> {
    try {
        // Ruta relativa al archivo JSON
        const filePath = path.join(
            process.cwd(),
            STORAGE_PATH,
            categoryId,
            'services.json'
        )

        // Leer archivo como string
        const fileContent = await fs.readFile(filePath, 'utf-8')

        // Parsear JSON
        const data = JSON.parse(fileContent) as ServiceJsonType[]

        return data
    } catch (error) {
        console.error(
            `❌ Error leyendo bundles de la categoría ${categoryId}:`,
            error
        )
        return []
    }
}
