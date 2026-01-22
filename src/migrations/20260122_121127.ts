import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_settings_bg_position" AS ENUM('center', 'right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum_pages_hero_settings_bg_type" AS ENUM('image', 'color', 'gradient', 'transparent');
  CREATE TYPE "public"."enum_pages_hero_settings_bg_size" AS ENUM('contain', 'cover', 'custom');
  CREATE TYPE "public"."enum_pages_hero_settings_bg_attachment" AS ENUM('scroll', 'fixed');
  CREATE TYPE "public"."enum__pages_v_version_hero_settings_bg_position" AS ENUM('center', 'right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_version_hero_settings_bg_type" AS ENUM('image', 'color', 'gradient', 'transparent');
  CREATE TYPE "public"."enum__pages_v_version_hero_settings_bg_size" AS ENUM('contain', 'cover', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_settings_bg_attachment" AS ENUM('scroll', 'fixed');
  ALTER TYPE "public"."enum_pages_hero_type" RENAME TO "enum_pages_hero_settings_type";
  ALTER TYPE "public"."enum__pages_v_version_hero_type" RENAME TO "enum__pages_v_version_hero_settings_type";
  CREATE TABLE "pages_hero_settings_bg_position" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_pages_hero_settings_bg_position",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_hero_settings_bg_position" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_version_hero_settings_bg_position",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "pages" RENAME COLUMN "hero_type" TO "hero_settings_type";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_type" TO "version_hero_settings_type";
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_type" "enum_pages_hero_settings_bg_type" DEFAULT 'transparent';
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_gradient" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_light_color" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_dark_color" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_repeat" boolean;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_size" "enum_pages_hero_settings_bg_size";
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_size_custom" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_attachment" "enum_pages_hero_settings_bg_attachment";
  ALTER TABLE "pages" ADD COLUMN "hero_settings_padding" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_type" "enum__pages_v_version_hero_settings_bg_type" DEFAULT 'transparent';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_gradient" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_light_color" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_repeat" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_size" "enum__pages_v_version_hero_settings_bg_size";
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_size_custom" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_attachment" "enum__pages_v_version_hero_settings_bg_attachment";
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_padding" varchar;
  ALTER TABLE "pages_hero_settings_bg_position" ADD CONSTRAINT "pages_hero_settings_bg_position_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_settings_bg_position" ADD CONSTRAINT "_pages_v_version_hero_settings_bg_position_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_settings_bg_position_order_idx" ON "pages_hero_settings_bg_position" USING btree ("order");
  CREATE INDEX "pages_hero_settings_bg_position_parent_idx" ON "pages_hero_settings_bg_position" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_settings_bg_position_order_idx" ON "_pages_v_version_hero_settings_bg_position" USING btree ("order");
  CREATE INDEX "_pages_v_version_hero_settings_bg_position_parent_idx" ON "_pages_v_version_hero_settings_bg_position" USING btree ("parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_settings_bg_image_id_media_id_fk" FOREIGN KEY ("hero_settings_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_settings_bg_image_id_media_id_fk" FOREIGN KEY ("version_hero_settings_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_settings_hero_settings_bg_image_idx" ON "pages" USING btree ("hero_settings_bg_image_id");
  CREATE INDEX "_pages_v_version_hero_settings_version_hero_settings_bg__idx" ON "_pages_v" USING btree ("version_hero_settings_bg_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_settings_type" RENAME TO "enum_pages_hero_type";
  ALTER TYPE "public"."enum__pages_v_version_hero_settings_type" RENAME TO "enum__pages_v_version_hero_type";
  ALTER TABLE "pages_hero_settings_bg_position" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_settings_bg_position" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_settings_bg_position" CASCADE;
  DROP TABLE "_pages_v_version_hero_settings_bg_position" CASCADE;
  ALTER TABLE "pages" RENAME COLUMN "hero_settings_type" TO "hero_type";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_settings_type" TO "version_hero_type";
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_settings_bg_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_settings_bg_image_id_media_id_fk";
  
  DROP INDEX "pages_hero_settings_hero_settings_bg_image_idx";
  DROP INDEX "_pages_v_version_hero_settings_version_hero_settings_bg__idx";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_type";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_gradient";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_light_color";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_dark_color";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_image_id";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_repeat";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_size";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_size_custom";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_attachment";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_padding";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_gradient";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_light_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_dark_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_repeat";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_size";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_size_custom";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_attachment";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_padding";
  DROP TYPE "public"."enum_pages_hero_settings_bg_position";
  DROP TYPE "public"."enum_pages_hero_settings_bg_type";
  DROP TYPE "public"."enum_pages_hero_settings_bg_size";
  DROP TYPE "public"."enum_pages_hero_settings_bg_attachment";
  DROP TYPE "public"."enum__pages_v_version_hero_settings_bg_position";
  DROP TYPE "public"."enum__pages_v_version_hero_settings_bg_type";
  DROP TYPE "public"."enum__pages_v_version_hero_settings_bg_size";
  DROP TYPE "public"."enum__pages_v_version_hero_settings_bg_attachment";`)
}
