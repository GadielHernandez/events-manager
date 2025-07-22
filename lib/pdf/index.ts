import jsPDF from 'jspdf'

const INITIAL_Y_POSITION = 10
const MARGIN = 10
const FONT_SIZE = 10
const MAX_X = 210
const LINE_BREAK = 10
const FONT_TITLE_SIZE = 35

class PDF {
    doc: jsPDF
    yLinePosition: number

    constructor() {
        this.doc = new jsPDF()
        this.doc.setFontSize(FONT_SIZE)

        this.yLinePosition = INITIAL_Y_POSITION
    }

    addHeader(date: string, id: string) {
        this.doc.setFont('helvetica', 'bold')
        this.doc.setFontSize(FONT_SIZE)

        const textWidth = this.doc.getTextWidth(id)
        const xRight = MAX_X - MARGIN - textWidth

        this.doc.text('Fecha:', MARGIN, this.yLinePosition)
        this.doc.text('Folio:', xRight, this.yLinePosition)

        this.yLinePosition += 5
        this.doc.setFont('helvetica', 'normal')
        this.doc.text(date, MARGIN, this.yLinePosition)
        this.doc.text(id, xRight, this.yLinePosition)

        this.yLinePosition += LINE_BREAK
    }

    async addBannerTitle(title: string) {
        return new Promise<void>((resolve) => {
            const IMG_HEIGHT = 50
            const imgData = '/img/logo.png'
            const image = new Image()
            image.src = imgData
            image.onload = () => {
                this.doc.addImage(
                    image,
                    'PNG',
                    MAX_X - MARGIN - 60,
                    this.yLinePosition - 5,
                    60,
                    IMG_HEIGHT
                )

                this.yLinePosition += IMG_HEIGHT - 15
                this.addTitle(title)
                resolve()
            }
        })
    }

    addTitle(text: string, subtitle?: string) {
        this.doc.setFontSize(FONT_TITLE_SIZE)
        this.doc.setFont('helvetica', 'bold')
        this.doc.text(text, MARGIN, this.yLinePosition)

        if (!subtitle) {
            this.yLinePosition = this.yLinePosition + LINE_BREAK
            return
        }

        this.yLinePosition = this.yLinePosition + 7

        this.doc.setFontSize(12)
        this.doc.setFont('helvetica', 'normal')
        this.doc.text(subtitle, MARGIN, this.yLinePosition)
        this.yLinePosition = this.yLinePosition + LINE_BREAK
    }

    addSubtitle(text: string) {
        this.yLinePosition = this.yLinePosition + LINE_BREAK
        this.doc.setFontSize(12)
        this.doc.setFont('helvetica', 'bold')
        this.doc.text(text.toUpperCase(), MARGIN, this.yLinePosition)

        this.yLinePosition = this.yLinePosition + LINE_BREAK
        return
    }

    addKeyValue(title: string, text: string) {
        this.doc.setFontSize(FONT_SIZE)
        this.doc.setFont('helvetica', 'bold')
        this.doc.text(title, MARGIN, this.yLinePosition)
        this.yLinePosition += 5
        this.doc.setFont('helvetica', 'normal')
        this.doc.text(text, MARGIN, this.yLinePosition)

        this.doc.setLineWidth(0.3) // Grosor fino
        this.doc.line(
            MARGIN,
            this.yLinePosition + 1,
            MAX_X - MARGIN,
            this.yLinePosition + 1
        )
        this.yLinePosition += LINE_BREAK
    }

    addMultipleKeyValue(values: Record<string, string>[]) {
        this.doc.setFontSize(FONT_SIZE)
        const nElements = values.length

        const COL_WIDTH = (MAX_X - MARGIN * 2) / nElements
        const TITLE_Y_OFFSET = 0
        const VALUE_Y_OFFSET = 5

        this.doc.setFontSize(FONT_SIZE)

        for (let i = 0; i < values.length; i += nElements) {
            const rowValues = values.slice(i, i + nElements)

            rowValues.forEach(({ title, text }, colIndex) => {
                const x = MARGIN + colIndex * COL_WIDTH

                this.doc.setFont('helvetica', 'bold')
                this.doc.text(
                    `${title}:`,
                    x,
                    this.yLinePosition + TITLE_Y_OFFSET
                )

                this.doc.setFont('helvetica', 'normal')
                this.doc.text(text, x, this.yLinePosition + VALUE_Y_OFFSET)

                this.doc.setLineWidth(0.3)
                this.doc.line(
                    x,
                    this.yLinePosition + VALUE_Y_OFFSET + 2,
                    COL_WIDTH + x - 2,
                    this.yLinePosition + VALUE_Y_OFFSET + 2
                )
            })

            this.yLinePosition += LINE_BREAK + VALUE_Y_OFFSET
        }
    }

    addKeyValues(values: Record<string, string>[]) {
        this.doc.setFontSize(FONT_SIZE)

        values.forEach(({ text, title }) => {
            this.doc.setFont('helvetica', 'bold')
            this.doc.text(title, MARGIN, this.yLinePosition)
            this.yLinePosition += 5
            this.doc.setFont('helvetica', 'normal')
            this.doc.text(text, MARGIN, this.yLinePosition)

            this.doc.setLineWidth(0.3) // Grosor fino
            this.doc.line(
                MARGIN,
                this.yLinePosition + 1,
                MAX_X - MARGIN,
                this.yLinePosition + 1
            )
            this.yLinePosition += LINE_BREAK
        })
    }

    addSelectedProducts(products: { name: string; price: number }[]) {
        const startX = MARGIN
        let currentY = this.yLinePosition

        const colWidths = [130, 40]
        const header = ['Nombre', 'Precio']

        // Header
        this.doc.setFont('helvetica', 'bold')
        header.forEach((text, i) => {
            const x = startX + (i === 0 ? 0 : colWidths[0])
            this.doc.text(text, x, currentY)
        })

        currentY += 6
        this.doc.setFont('helvetica', 'normal')

        let total = 0

        // Rows
        products.forEach(({ name, price }) => {
            this.doc.text(name, startX, currentY)
            this.doc.text(
                `$${price.toFixed(2)}`,
                startX + colWidths[0],
                currentY
            )
            total += price
            currentY += 6
        })

        // Separador
        this.doc.setLineWidth(0.3)
        this.doc.line(startX, currentY, MAX_X - MARGIN, currentY)
        currentY += 6

        // Total
        this.doc.setFont('helvetica', 'bold')
        this.doc.text('Total:', startX, currentY)
        this.doc.text(`$${total.toFixed(2)}`, startX + colWidths[0], currentY)

        this.yLinePosition = currentY + LINE_BREAK
    }

    download(name: string) {
        this.doc.save(name)
    }
}

export default PDF
