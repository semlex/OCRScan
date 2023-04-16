import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { OcrService } from './ocr.service'
import { FileService } from '../file/file.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('ocr')
export class OcrController {
  constructor(
    private ocrService: OcrService,
    private fileService: FileService,
  ) {}

  @Post('/imgToPdf')
  @UseInterceptors(FileInterceptor('img'))
  async imgToPdf(
    @Req() request: Request,
    @UploadedFile() img: Express.Multer.File,
    @Res() res: Response,
  ) {
    const buffer = await this.ocrService.imgToPdf(img.buffer)
    const stream = this.fileService.getReadableStream(buffer)

    console.log(request.cookies)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    })

    stream.pipe(res)
  }
}
