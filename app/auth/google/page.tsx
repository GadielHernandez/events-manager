'use client'

import { useEffect, useState } from 'react'

export default function GoogleAuthPage() {
    const [url, setUrl] = useState('')

    useEffect(() => {
        fetch('/api/google/auth')
            .then((res) => res.json())
            .then((data) => setUrl(data.url))
    }, [])

    return (
        <div className="max-w-lg mx-auto py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">
                Autorizar Google Calendar
            </h1>
            {url && (
                <a href={url} className="btn btn-primary">
                    Autorizar con Google
                </a>
            )}
        </div>
    )
}
