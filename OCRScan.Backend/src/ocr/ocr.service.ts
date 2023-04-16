import { Injectable } from '@nestjs/common'
import { createWorker } from 'tesseract.js'

@Injectable()
export class OcrService {
  async imgToPdf(imgBuffer): Promise<Buffer> {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    })

    let file

    await (async () => {
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      await worker.recognize(imgBuffer)
      file = (await worker.getPDF('result')).data
      await worker.terminate()
    })()

    return Buffer.from(file)
  }
}
