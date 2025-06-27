import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '@/common/decorators';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Public()
  @Post('single')
  @UseInterceptors(FileInterceptor("file"))// 'file'是前端表单字段名
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadSingle(file);
  }
}
