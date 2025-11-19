import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

type files = { name: string; maxCount: number };

// ! Add upload file path configuration

export function MultiFileUpload(props: files[]) {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(props, {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const folder = file.fieldname;
            const uploadPath = join(
              __dirname,
              '..',
              '..',
              '..',
              'public',
              'uploads',
              folder,
            );

            if (!existsSync(uploadPath)) {
              mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const uniqueName = `${file.fieldname}-${uuidv4()}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
        }),
        limits: {
          fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (_, file, cb) => {
          const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
          const ext = extname(file.originalname).toLowerCase();
          if (allowed.includes(ext)) cb(null, true);
          else cb(new Error('Only images are allowed'), false);
        },
      }),
    ),
  );
}
