import { NextResponse } from 'next/server'
import GoogleDrive from '@/services/google/drive'

export async function POST() {
    await GoogleDrive.setFolder()
    await GoogleDrive.setCounter()

    return NextResponse.json({
        currentCounter: GoogleDrive.counter,
        driveFolderId: GoogleDrive.folderId,
    })
}
