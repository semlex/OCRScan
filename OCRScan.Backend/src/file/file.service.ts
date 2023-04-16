import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
