import { Paginator } from '#common/utils/Paginator';
import { HasRole } from '#modules/auth/decorators';
import { Role } from '#modules/user/types';
import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { User } from './entities';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @HasRole(Role.Admin)
  async index(
    @Query('perPage', new DefaultValuePipe(10)) perPage = 1,
    @Query('page', new DefaultValuePipe(1)) page = 10,
  ): Promise<Paginator<User>> {
    return this.userService.paginate({ perPage, page });
  }

  @Get(':userId')
  @HasRole(Role.Admin)
  async show(@Param('userId') userId: string): Promise<User> {
    return this.userService.findOneOrFail({ id: userId });
  }
}
