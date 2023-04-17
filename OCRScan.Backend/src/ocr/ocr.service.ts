import { Injectable } from '@nestjs/common'
import { createWorker, Lang } from 'tesseract.js'

@Injectable()
export class OcrService {
  async imgToPdf(imgBuffer: Buffer, languages: Lang[]): Promise<Buffer> {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    })

    let file

    await (async () => {
      await worker.loadLanguage(languages)
      await worker.initialize(languages)
      await worker.recognize(imgBuffer)
      file = (await worker.getPDF('result')).data
      await worker.terminate()
    })()

    return Buffer.from(file)
  }
}
