import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductAttachmentTable1641555625713
  implements MigrationInterface
{
  name = 'CreateProductAttachmentTable1641555625713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "product_attachment" (
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "id" SERIAL NOT NULL,
            "group" character varying,
            "position" integer NOT NULL DEFAULT '0',
            "product_id" integer,
            "attachment_id" integer,
            CONSTRAINT "PK_2947d6b1afa89f4ee818d7237fa" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "product_attachment"
        ADD CONSTRAINT "FK_03a24c373a510272e0bb4e42eee" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "product_attachment"
        ADD CONSTRAINT "FK_db08302b18538d3be7f2a40ba30" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "product_attachment" DROP CONSTRAINT "FK_db08302b18538d3be7f2a40ba30"
    `);
    await queryRunner.query(`
        ALTER TABLE "product_attachment" DROP CONSTRAINT "FK_03a24c373a510272e0bb4e42eee"
    `);
    await queryRunner.query(`
        DROP TABLE "product_attachment"
    `);
  }
}
