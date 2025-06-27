import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../../uploads'),
        filename: (req, file, cb) => {
          const originalName = file.originalname;
          const utf8Name = Buffer.from(originalName, 'latin1').toString('utf8');
          const ext = originalName.substring(originalName.lastIndexOf("."));
          const filename = `${Date.now()}-${utf8Name}${ext}`;//文件名

          cb(null, filename);
        },
      }),
      // 添加文件类型过滤
      // fileFilter: (req, file, cb) => {
      //   const allowedTypes = [
      //     'image/jpeg',
      //     'image/png',
      //     'application/pdf',
      //     'text/csv'
      //   ];

      //   if (allowedTypes.includes(file.mimetype)) {
      //     cb(null, true);
      //   } else {
      //     cb(new Error('不支持的文件类型'), false);
      //   }
      // },
      // limits: {
      //   fileSize: 1024 * 1024 * 5, // 文件大小5M
      //   files: 5,// 同时上传文件数量5
      // },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule { }
