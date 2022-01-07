import { S3ClientFactory } from '#common/providers';
import { AttachmentRepository } from './attachment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentRepository])],
  controllers: [AttachmentController],
  providers: [AttachmentService, S3ClientFactory],
  exports: [AttachmentService],
})
export class AttachmentModule {}
