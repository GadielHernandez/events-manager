import { Suspense } from 'react'
import CallbackPageContent from './CallbackPageContent'

export default function CallbackPage() {
    return (
        <Suspense fallback={<p>Cargando ...</p>}>
            <CallbackPageContent />
        </Suspense>
    )
}
