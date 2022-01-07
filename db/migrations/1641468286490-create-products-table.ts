import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1641468286490 implements MigrationInterface {
  name = 'CreateProductsTable1641468286490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "products" (
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "id" SERIAL NOT NULL,
            "created_by" uuid,
            "updated_by" uuid,
            "featured_attachment_id" integer,
            "name" character varying NOT NULL,
            "slug" character varying NOT NULL,
            "description" text,
            "enabled" boolean NOT NULL DEFAULT true,
            "price" numeric NOT NULL DEFAULT '0',
            "sale_price" numeric NOT NULL DEFAULT '0',
            "retail_price" numeric NOT NULL DEFAULT '0',
            "wholesale_price" numeric NOT NULL DEFAULT '0',
            "available_at" TIMESTAMP WITH TIME ZONE,
            "discontinue_at" TIMESTAMP WITH TIME ZONE,
            CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"),
            CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "products"
        ADD CONSTRAINT "FK_41e67565f85351ef616c625db97" FOREIGN KEY ("featured_attachment_id") REFERENCES "attachments"("id") ON DELETE
        SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "products" DROP CONSTRAINT "FK_41e67565f85351ef616c625db97"
    `);
    await queryRunner.query(`
        DROP TABLE "products"
    `);
  }
}
