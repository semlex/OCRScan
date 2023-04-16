import {
  Controller,
  Post,
  Body,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { OcrService } from './ocr.service';
import { FileService } from '../file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ocr')
export class OcrController {
  constructor(
    private ocrService: OcrService,
    private fileService: FileService,
  ) {}

  @Post('/imgToPdf')
  @UseInterceptors(FileInterceptor('img'))
  async imgToPdf(
    @UploadedFile() img: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(img);
    const buffer = await this.ocrService.imgToPdf(img.buffer);
    const stream = this.fileService.getReadableStream(buffer);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }
}
