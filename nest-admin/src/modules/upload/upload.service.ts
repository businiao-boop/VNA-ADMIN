import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {

  uploadSingle(file: Express.Multer.File) {
    return {
      filename: file.originalname,
      size: file.size
    }
  }
}
