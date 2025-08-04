'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CallbackPage() {
    const [refreshToken, setRefreshToken] = useState('')
    const [error, setError] = useState('')
    const searchParams = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('code')
        if (code) {
            fetch('/api/google/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.refresh_token) {
                        setRefreshToken(data.refresh_token)
                    } else {
                        setError(
                            'No se recibió el refresh_token. Ya lo habías generado antes con esta cuenta.'
                        )
                    }
                })
                .catch((err) => {
                    console.error(err)
                    setError('Error al obtener el token')
                })
        }
    }, [searchParams])

    return (
        <div className="max-w-xl mx-auto py-10 text-center">
            <h1 className="text-2xl font-bold mb-4">
                Resultado de autorización
            </h1>
            {refreshToken ? (
                <div>
                    <p className="mb-2">
                        Tu <strong>refresh_token</strong> es:
                    </p>
                    <pre className="bg-base-200 p-4 rounded text-sm">
                        {refreshToken}
                    </pre>
                </div>
            ) : (
                <p>{error || 'Esperando respuesta...'}</p>
            )}
        </div>
    )
}
