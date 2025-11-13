import { checkDiscount } from '@/services/discount'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { code } = await req.json()

    const discount = checkDiscount(code)
    return NextResponse.json({ discount })
}
