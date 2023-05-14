import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { OcrService } from './ocr.service'
import { FileService } from '../file/file.service'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'

@Controller('ocr')
export class OcrController {
  constructor(
    private ocrService: OcrService,
    private fileService: FileService,
  ) {}

  @Post('/imgToPdf')
  @UseInterceptors(FilesInterceptor('img'))
  async imgToPdf(
    @Req() req: Request,
    @UploadedFiles() img: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    console.log(img)
    const buffers = await this.ocrService.imgToPdf(
      img.map((img) => img.buffer),
      JSON.parse(req.cookies['languages']),
    )

    const buffer = await this.fileService.mergePdf(buffers)

    const stream = this.fileService.getReadableStream(buffer)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.byteLength,
    })

    stream.pipe(res)
  }

  @Post('/imgToText')
  @UseInterceptors(FileInterceptor('img'))
  async imgToText(
    @Req() req: Request,
    @UploadedFile() img: Express.Multer.File,
  ) {
    const text = await this.ocrService.imgToText(
      img.buffer,
      JSON.parse(req.cookies['languages']),
    )
    return {
      text,
    }
  }

  @Post('/makeSearchablePdf')
  @UseInterceptors(FileInterceptor('pdf'))
  async makeSearchablePdf(
    @Req() req: Request,
    @UploadedFile() pdf: Express.Multer.File,
    @Res() res: Response,
  ) {
    const buffers = await this.ocrService.makeReadablePdf(
      pdf.buffer,
      JSON.parse(req.cookies['languages']),
    )

    const buffer = await this.fileService.mergePdf(buffers)

    const stream = this.fileService.getReadableStream(buffer)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.byteLength,
    })

    stream.pipe(res)
  }
}
