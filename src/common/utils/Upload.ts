import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

export interface UploadedFile extends Express.Multer.File {}

export const HasUpload = (
  name: string,
  options?: multer.Options,
  limit: number = Number.MAX_SAFE_INTEGER,
) => {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(name, limit, options)),
  );
};
