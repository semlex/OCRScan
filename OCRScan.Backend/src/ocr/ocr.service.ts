import { Injectable } from '@nestjs/common'
import { createWorker } from 'tesseract.js'
import { ImageService } from '../image/image.service'
import { convert } from 'pdf-img-convert'

@Injectable()
export class OcrService {
  constructor(private readonly imageService: ImageService) {}
  async imgToPdf(
    imgBuffers: Buffer[],
    languages: string[],
    filters: boolean,
  ): Promise<Buffer[]> {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    })

    let file
    const pdfBuffs: Buffer[] = []
    let imgBuff

    await (async () => {
      for (const imgBuffer of imgBuffers) {
        if (filters) {
          imgBuff = await this.imageService.preprocessImage(imgBuffer)
        } else {
          imgBuff = imgBuffer
        }
        await worker.loadLanguage(languages.join('+'))
        await worker.initialize(languages.join('+'))
        await worker.recognize(imgBuff)
        file = (await worker.getPDF('result')).data
        pdfBuffs.push(Buffer.from(file))
      }
      await worker.terminate()
    })()

    return pdfBuffs
  }

  async imgToText(
    imgBuffer: Buffer,
    languages: string[],
    filters: boolean,
  ): Promise<string> {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    })

    let imgBuff

    if (filters) {
      imgBuff = await this.imageService.preprocessImage(imgBuffer)
    } else {
      imgBuff = imgBuffer
    }

    let result = ''

    await (async () => {
      await worker.loadLanguage(languages.join('+'))
      await worker.initialize(languages.join('+'))
      const {
        data: { text },
      } = await worker.recognize(imgBuff)
      result = text
      await worker.terminate()
    })()

    return result
  }

  async makeReadablePdf(
    pdfBuffer: Buffer,
    languages: string[],
    filters: boolean,
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
    let imgBuff

    await (async () => {
      await worker.loadLanguage(languages.join('+'))
      await worker.initialize(languages.join('+'))
      for (const image of images) {
        // const page = await pdfDoc.getPage(i)
        // const stream = await page.streamTextContent()
        // const data = await stream.getReader().read()

        console.log(filters)

        if (filters) {
          imgBuff = await this.imageService.preprocessImage(Buffer.from(image))
        } else {
          imgBuff = Buffer.from(image)
        }

        await worker.recognize(imgBuff)
        file = (await worker.getPDF('result')).data
        pdfBuffs.push(Buffer.from(file))
      }
      await worker.terminate()
    })()

    return pdfBuffs
  }
}
