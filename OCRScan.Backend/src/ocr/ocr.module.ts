import { Module } from '@nestjs/common'
import { OcrService } from './ocr.service'
import { OcrController } from './ocr.controller'
import { ImageModule } from '../image/image.module'
import { FileModule } from '../file/file.module'

@Module({
  providers: [OcrService],
  controllers: [OcrController],
  imports: [ImageModule, FileModule],
})
export class OcrModule {}
