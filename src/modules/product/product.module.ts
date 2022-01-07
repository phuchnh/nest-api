import { Attachment } from '#modules/attachment/entities';
import { ACTIONS } from './actions';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Attachment])],
  controllers: [ProductController],
  providers: [ProductService, ...ACTIONS],
  exports: [ProductService],
})
export class ProductModule {}
