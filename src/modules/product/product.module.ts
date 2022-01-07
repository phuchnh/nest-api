import { Attachment } from '#modules/attachment/entities';
import { ACTIONS } from './actions';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductAttachment } from './entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Attachment, ProductAttachment])],
  controllers: [ProductController],
  providers: [ProductService, ...ACTIONS],
  exports: [ProductService],
})
export class ProductModule {}
