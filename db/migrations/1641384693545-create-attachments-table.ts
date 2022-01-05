import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAttachmentsTable1641384693545 implements MigrationInterface {
  name = 'CreateAttachmentsTable1641384693545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "attachments" (
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "original_name" character varying NOT NULL,
            "mime" character varying NOT NULL,
            "size" integer NOT NULL DEFAULT '0',
            "path" text NOT NULL,
            "created_by" uuid,
            CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "attachments"
    `);
  }
}
