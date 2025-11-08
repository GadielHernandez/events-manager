import fs from 'fs/promises'
import path from 'path'
import {
    CategoryList,
    BundleType,
    BundleJsonType,
    ServiceJsonType,
} from './types'

// {
//     "id": "EFFECTS",
//     "name": "Efectos especiales",
//     "img": "EFFECTS.webp",
//     "description": "Chisperos, burbujas, lluvia metálica y más para un momento inolvidable."
// },
// {
//     "id": "PHOTO",
//     "name": "Fotografía y video",
//     "img": "PHOTO.webp",
//     "description": "Captura cada instante con paquetes de foto y video a tu medida."
// },
// {
//     "id": "ANIMATION",
//     "name": "Animación",
//     "img": "ANIMATION.webp",
//     "description": "El show más aclamado, lleno de energía, coreografías y dinamismo con Alex Merla.."
// },
// {
//     "id": "CABS",
//     "name": "Fotocabinas",
//     "img": "CABS.webp",
//     "description": "VideoBooth 360°, cabinas interactivas y fotos instantáneas divertidas."
// },

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

export async function getBundleByCategory(
    categoryId: string,
    bundleId: string
): Promise<BundleType | undefined> {
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
        const bundles = JSON.parse(fileContent) as BundleJsonType[]

        return bundles.find((bundle) => bundle.id === bundleId)
    } catch (error) {
        console.error(
            `❌ Error leyendo bundles de la categoría ${categoryId}:`,
            error
        )
        return undefined
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
