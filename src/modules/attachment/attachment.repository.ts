import { Attachment } from './entities/attachment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Attachment)
export class AttachmentRepository extends Repository<Attachment> {}
