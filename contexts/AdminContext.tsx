'use client'
import { createContext, useContext, useState, useEffect } from 'react'

type AdminSettings = {
    customDiscount?: number
    customAdvance?: number
    customExtra?: number
}

type AdminContextType = {
    settings: AdminSettings
    setSettings: (settings: AdminSettings) => void
    clearSettings: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettingsState] = useState<AdminSettings>({})

    // Load from sessionStorage on mount
    useEffect(() => {
        const stored = sessionStorage.getItem('adminSettings')
        if (stored) {
            setSettingsState(JSON.parse(stored))
        }
    }, [])

    const setSettings = (newSettings: AdminSettings) => {
        setSettingsState(newSettings)
        sessionStorage.setItem('adminSettings', JSON.stringify(newSettings))
    }

    const clearSettings = () => {
        setSettingsState({})
        sessionStorage.removeItem('adminSettings')
    }

    return (
        <AdminContext.Provider value={{ settings, setSettings, clearSettings }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (!context) throw new Error('useAdmin must be used within AdminProvider')
    return context
}
