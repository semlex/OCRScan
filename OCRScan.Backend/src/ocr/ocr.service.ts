import { Injectable } from '@nestjs/common'
import { createWorker } from 'tesseract.js'
import { ImageService } from '../image/image.service'
import { convert } from 'pdf-img-convert'

@Injectable()
export class OcrService {
  constructor(private readonly imageService: ImageService) {}
  async imgToPdf(imgBuffer: Buffer, languages: string[]): Promise<Buffer> {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    })

    const processedImgBuff = await this.imageService.preprocessImage(imgBuffer)

    let file

    await (async () => {
      await worker.loadLanguage(languages.join('+'))
      await worker.initialize(languages.join('+'))
      await worker.recognize(processedImgBuff)
      file = (await worker.getPDF('result')).data
      await worker.terminate()
    })()

    return Buffer.from(file)
  }

  async imgToText(imgBuffer: Buffer, languages: string[]): Promise<string> {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    })

    const processedImgBuff = await this.imageService.preprocessImage(imgBuffer)

    let result = ''

    await (async () => {
      await worker.loadLanguage(languages.join('+'))
      await worker.initialize(languages.join('+'))
      const {
        data: { text },
      } = await worker.recognize(processedImgBuff)
      result = text
      await worker.terminate()
    })()

    return result
  }

  async makeReadablePdf(
    pdfBuffer: Buffer,
    languages: string[],
  ): Promise<Buffer[]> {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    })

    const images = await convert(pdfBuffer)

    // const pdfDoc2 = await PDFDocument.load(pdfBuffer)
    // pdfDoc2.getPages()
    //
    // const pdfDoc = await getDocument(pdfBuffer).promise

    let file
    const pdfBuffs: Buffer[] = []

    await (async () => {
      await worker.loadLanguage(languages.join('+'))
      await worker.initialize(languages.join('+'))
      for (const image of images) {
        // const page = await pdfDoc.getPage(i)
        // const stream = await page.streamTextContent()
        // const data = await stream.getReader().read()

        const imgBuffer = Buffer.from(image)
        await worker.recognize(imgBuffer)
        file = (await worker.getPDF('result')).data
        pdfBuffs.push(Buffer.from(file))
      }
      await worker.terminate()
    })()

    return pdfBuffs
  }
}
