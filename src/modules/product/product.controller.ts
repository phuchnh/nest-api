import { AuthUser } from '#modules/auth/decorators';
import { User } from '#modules/user/entities';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductAction, CreateProductDto } from './actions';

@Controller('products')
export class ProductController {
  constructor(private action: CreateProductAction) {}

  @Post('')
  async create(@AuthUser() user: User, @Body() payload: CreateProductDto) {
    return this.action.execute(user, payload);
  }
}
