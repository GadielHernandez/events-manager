'use client'
import React from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import AdminPasswordDialog from './AdminPasswordDialog'
import AdminSettingsDialog from './AdminSettingsDialog'

const AdminSettingsButton = () => {
    const passwordDialogId = 'admin-password-dialog'
    const settingsDialogId = 'admin-settings-dialog'

    const handleClick = () => {
        const dialog = document?.getElementById(
            passwordDialogId,
        ) as HTMLDialogElement
        dialog.showModal()
    }

    const handlePasswordSuccess = () => {
        const dialog = document?.getElementById(
            settingsDialogId,
        ) as HTMLDialogElement
        dialog.showModal()
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-ghost btn-circle"
                onClick={handleClick}
                title="Configuración de administrador"
            >
                <Cog6ToothIcon className="h-6 w-6 text-white" />
            </button>
            <AdminPasswordDialog
                id={passwordDialogId}
                onSuccess={handlePasswordSuccess}
            />
            <AdminSettingsDialog id={settingsDialogId} />
        </>
    )
}

export default AdminSettingsButton
