import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1641223723327 implements MigrationInterface {
  name = 'CreateUsersTable1641223723327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "role" character varying NOT NULL DEFAULT 'user',
        "email" character varying NOT NULL,
        "name" character varying NOT NULL,
        "last_logged_in_at" TIMESTAMP WITH TIME ZONE,
        "email_verified_at" TIMESTAMP WITH TIME ZONE,
        "remember_token" character varying,
        "password" character varying NOT NULL,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "users"
    `);
  }
}
