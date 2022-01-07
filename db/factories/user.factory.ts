import { Enum, Hash } from '#common/utils';
import { Role } from '#modules/user/types';
import { User } from '#modules/user/entities/user.entity';
import * as faker from 'faker';
import { define } from 'typeorm-seeding';

define(User, () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const user = new User();
  user.role = faker.random.arrayElement(Enum.toArray(Role));
  user.name = `${firstName} ${lastName}`;
  user.email = faker
    .unique(faker.internet.exampleEmail, [firstName, lastName])
    .toLowerCase();
  user.password = Hash.make('password@');
  return user;
});
