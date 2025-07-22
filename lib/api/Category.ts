import { BundleType, CategoryType } from '../storage/services/types'

class Category {
    async getList() {
        try {
            const res = await fetch(`/api/categories`)
            if (!res.ok) throw new Error('Error al obtener los paquetes')
            const data = await res.json()
            return data as CategoryType[]
        } catch (error) {
            console.error('❌ Error:', error)
            return [] as CategoryType[]
        }
    }

    async getBundles(categoryId: string) {
        try {
            const res = await fetch(`/api/bundles?category=${categoryId}`)
            if (!res.ok) throw new Error('Error al obtener los paquetes')
            const data = (await res.json()) as BundleType[]
            return data
        } catch (error) {
            console.error('❌ Error:', error)
            return [] as BundleType[]
        }
    }
}

export default new Category()
