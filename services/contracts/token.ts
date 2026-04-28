import { SignJWT, jwtVerify } from 'jose'

const EXPIRY_HOURS = Number(process.env.CONTRACT_TOKEN_EXPIRY_HOURS || 72)

function getSecret(): Uint8Array {
    const secret = process.env.CONTRACT_JWT_SECRET
    if (!secret) throw new Error('CONTRACT_JWT_SECRET is not set')
    return new TextEncoder().encode(secret)
}

export async function generateContractToken(fileId: string, folio: string): Promise<string> {
    return new SignJWT({ fileId, folio })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(`${EXPIRY_HOURS}h`)
        .sign(getSecret())
}

export async function verifyContractToken(token: string): Promise<{ fileId: string; folio: string } | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret())
        return payload as { fileId: string; folio: string }
    } catch {
        return null
    }
}
