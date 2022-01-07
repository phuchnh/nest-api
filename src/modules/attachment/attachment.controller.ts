import { HasUpload, UploadedFile } from '#common/utils';
import { AuthUser } from '#modules/auth/decorators';
import { User } from '#modules/user/entities';
import {
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { AttachmentService } from './attachment.service';

@Controller('/attachments')
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Get('')
  async index(
    @AuthUser() user: User,
    @Query('perPage', new DefaultValuePipe(10)) perPage = 1,
    @Query('page', new DefaultValuePipe(1)) page = 10,
  ) {
    return this.attachmentService.paginate({ perPage, page }, user);
  }

  @Post('upload')
  @HasUpload('files')
  async upload(@AuthUser() user: User, @UploadedFiles() files: UploadedFile[]) {
    return this.attachmentService.upload(user, files);
  }
}
