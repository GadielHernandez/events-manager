import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
)

export async function POST(req: NextRequest) {
    const { code } = await req.json()

    try {
        const { tokens } = await oauth2Client.getToken(code)
        return NextResponse.json(tokens)
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: 'Failed to get token' },
            { status: 500 }
        )
    }
}
