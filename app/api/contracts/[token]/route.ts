import { NextRequest, NextResponse } from 'next/server'
import { verifyContractToken } from '@/services/contracts/token'
import { google } from 'googleapis'
import GoogleClient from '@/services/google'

export const runtime = 'nodejs'

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params
    const payload = await verifyContractToken(token)

    if (!payload) {
        return NextResponse.json(
            { error: 'Link inválido o expirado' },
            { status: 401 }
        )
    }

    const drive = google.drive({ version: 'v3', auth: GoogleClient.auth })

    const file = await drive.files.get(
        { fileId: payload.fileId, alt: 'media' },
        { responseType: 'arraybuffer' }
    )

    return new NextResponse(file.data as ArrayBuffer, {
        headers: {
            'Content-Type': 'image/jpeg',
            'Content-Disposition': `inline; filename="precontrato-${payload.folio}.jpg"`,
            'Cache-Control': 'private, max-age=3600',
        },
    })
}
