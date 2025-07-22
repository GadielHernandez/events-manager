// app/api/bundles/route.ts

import { NextResponse } from 'next/server'
import { getBundlesByCategory } from '@/lib/storage/services'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category')

    if (!categoryId) {
        return NextResponse.json({ error: 'Missing category' }, { status: 400 })
    }

    const bundles = await getBundlesByCategory(categoryId)
    return NextResponse.json(bundles)
}
