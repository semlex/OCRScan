import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { OcrController } from './ocr.controller';
import { FileService } from '../file/file.service';

@Module({
  providers: [OcrService, FileService],
  controllers: [OcrController],
})
export class OcrModule {}
