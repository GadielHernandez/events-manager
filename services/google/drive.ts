import { drive_v3, google } from 'googleapis'
import GoogleClient from './index'
import { Readable } from 'stream'

const FILE_NAME_PREFIX = 'Contrato'
const MAX_ID_LEN = 5

class GoogleDrive {
    counter = 0
    folderId: undefined | string | null = undefined
    bufferToStream(buffer: Buffer) {
        const stream = new Readable()
        stream.push(buffer)
        stream.push(null) // fin del stream
        return stream
    }

    getContractFolio() {
        this.counter++
        const folio = String(this.counter).padStart(MAX_ID_LEN, '0')
        return folio
    }

    async saveImage(img: Buffer, contractFolio: string) {
        const drive = google.drive({ version: 'v3', auth: GoogleClient.auth })
        const result = await drive.files.create({
            requestBody: {
                name: `Contrato${contractFolio}`,
                parents: this.folderId ? [this.folderId] : undefined,
            },
            media: {
                mimeType: 'image/jpeg',
                body: this.bufferToStream(img),
            },
            fields: 'id, webViewLink',
        })

        return result.data
    }

    async setFolder() {
        const { CONTRACT_FOLDER_NAME = 'Contratos' } = process.env
        const drive = google.drive({ version: 'v3', auth: GoogleClient.auth })

        const res = await drive.files.list({
            q: `name='${CONTRACT_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
            spaces: 'drive',
        })

        const files = res.data.files
        if (files && files.length > 0) {
            this.folderId = files[0].id
            return
        }

        const fileMetadata = {
            name: CONTRACT_FOLDER_NAME,
            mimeType: 'application/vnd.google-apps.folder',
        }

        const file = await drive.files.create({
            requestBody: fileMetadata,
            fields: 'id',
        })

        this.folderId = file.data.id
    }

    async getLastFile(): Promise<drive_v3.Schema$File | undefined> {
        const drive = google.drive({ version: 'v3', auth: GoogleClient.auth })

        const res = await drive.files.list({
            q: `'${this.folderId}' in parents and trashed=false`,
            orderBy: 'createdTime desc',
            pageSize: 1,
            fields: 'files(id, name, mimeType, createdTime)',
        })

        const files = res.data.files
        if (!files || files.length === 0) return

        const lastFile = files[0]
        return lastFile
    }

    async setCounter() {
        const lastFile = await this.getLastFile()
        if (!lastFile) return

        const fileName = lastFile.name
        const current = fileName?.replace(FILE_NAME_PREFIX, '') || '0'
        this.counter = parseInt(current)
    }
}

export default new GoogleDrive()
