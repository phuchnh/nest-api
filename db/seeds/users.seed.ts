import { User } from '#modules/user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class UsersSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.manager.clear(User);
    const users = await factory(User)().makeMany(10, {
      emailVerifiedAt: new Date(),
    });
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute();
  }
}
