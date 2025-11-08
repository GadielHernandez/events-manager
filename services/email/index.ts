import nodemailer from 'nodemailer'
import fs from 'fs/promises'
import path from 'path'
import { minify } from 'html-minifier-terser'

const BASE_PATH_TEMPLATES = 'services/email/templates'

type sendMailProps = {
    to: string
    contract: Buffer
}

export async function sendPreContractMail({ to, contract }: sendMailProps) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD, // usa "App Password" si tienes 2FA
        },
    })

    const filePath = path.join(
        process.cwd(),
        BASE_PATH_TEMPLATES,
        'precontract-confirmation.html'
    )
    const htmlTemplate = await fs.readFile(filePath)
    const compactHTML = await minify(htmlTemplate.toString('utf8'), {
        collapseWhitespace: true,
    })

    await transporter.sendMail({
        from: `"Todo con un solo proveedor" <${process.env.GMAIL_USERNAME}>`,
        to,
        subject:
            'En TodoConUnSoloProveedor by Alex Merla estamos casi listos para tu evento …',
        html: compactHTML,
        attachments: [
            {
                filename: 'contrato.jpg',
                content: contract,
                contentType: 'image/jpeg',
                contentDisposition: 'inline',
            },
        ],
    })
}
