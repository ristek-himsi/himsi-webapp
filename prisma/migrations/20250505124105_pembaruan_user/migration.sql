/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `divisions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "photo_url" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "divisions_name_key" ON "divisions"("name");
