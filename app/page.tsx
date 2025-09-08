import CategoriesPage from '@/components/Categories'
import { getCategories } from '@/lib/storage/services'

export default async function Home() {
    const categories = await getCategories()
    return <CategoriesPage categories={categories.list} />
}
