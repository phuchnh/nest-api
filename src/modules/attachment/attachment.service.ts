import { S3_CLIENT } from '#common/providers';
import { Sort } from '#common/types';
import { Paginator, UploadedFile } from '#common/utils';
import { AwsConfig, InjectAwsConfig } from '#config';
import { User } from '#modules/user/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import moment from 'moment/moment';
import { extname } from 'path';
import randToken from 'rand-token';
import { Attachment } from './entities/attachment.entity';
import { AttachmentRepository } from './attachment.repository';
import { UploadFailedException } from './exceptions';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectAwsConfig private aswConfig: AwsConfig,
    @Inject(S3_CLIENT) private s3: S3,
    private repository: AttachmentRepository,
  ) {}

  async paginate(
    options: any = {},
    user: User,
  ): Promise<Paginator<Attachment>> {
    const { perPage, page } = options;
    return this.repository
      .createQueryBuilder('a')
      .where('a.creator = :userId', { userId: user.id })
      .orderBy('a.createdAt', Sort.DESC)
      .paginate(perPage, page);
  }

  async upload(user: User, files: UploadedFile[]): Promise<Attachment[]> {
    const attachments = [];
    for (const file of files) {
      const prefix = moment().format('YYYY/MM/DD');
      const attachment = new Attachment();

      attachment.originalName = file.originalname;
      attachment.mime = file.mimetype;
      attachment.name = randToken.generate(16) + extname(file.originalname);
      attachment.size = file.size;
      attachment.path = `uploads/${prefix}/${attachment.name}`;
      attachment.creator = user;

      try {
        await this.s3
          .upload({
            Bucket: this.aswConfig.bucket,
            Key: attachment.path,
            Body: file.buffer,
            ContentType: attachment.mime,
          })
          .promise();

        await this.repository.save(attachment);

        attachments.push(attachment);
      } catch (e) {
        for (const uploadedFile of attachments) {
          await this.s3
            .deleteObject({
              Bucket: this.aswConfig.bucket,
              Key: uploadedFile.path,
            })
            .promise();
        }
        throw new UploadFailedException();
      }
    }
    return attachments;
  }
}
