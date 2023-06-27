import { Injectable } from '@nestjs/common'
import * as sharp from 'sharp'

@Injectable()
export class ImageService {
  private async cleanImage(imgBuffer: Buffer): Promise<Buffer> {
    const img = sharp(imgBuffer)

    return await img.grayscale().normalize().rotate().threshold(127).toBuffer()
  }

  async preprocessImage(imgBuffer: Buffer): Promise<Buffer> {
    return await this.cleanImage(imgBuffer)
  }
}
