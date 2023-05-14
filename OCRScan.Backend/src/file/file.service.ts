import { Injectable } from '@nestjs/common'
import { PDFDocument } from 'pdf-lib'
import { Readable } from 'stream'

@Injectable()
export class FileService {
  getReadableStream(buffer: Buffer | ArrayBuffer): Readable {
    const stream = new Readable()

    const buff = Buffer.from(buffer)

    stream.push(buff)
    stream.push(null)

    return stream
  }

  async mergePdf(buffers: Buffer[]): Promise<ArrayBuffer> {
    const mergedPdf = await PDFDocument.create()
    for (const pdfBytes of buffers) {
      const pdf = await PDFDocument.load(pdfBytes)
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page)
      })
    }

    const buf = await mergedPdf.save()

    return buf.buffer
  }
}
