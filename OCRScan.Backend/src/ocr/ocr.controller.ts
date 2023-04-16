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
    @Req() req: Request,
    @UploadedFile() img: Express.Multer.File,
    @Res() res: Response,
  ) {
    const buffer = await this.ocrService.imgToPdf(
      img.buffer,
      JSON.parse(req.cookies['languages']),
    )
    const stream = this.fileService.getReadableStream(buffer)

    console.log(req.cookies)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    })

    stream.pipe(res)
  }
}
