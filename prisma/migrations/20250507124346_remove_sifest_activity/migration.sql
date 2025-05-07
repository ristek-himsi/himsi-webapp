/*
  Warnings:

  - You are about to drop the `sifest_activities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sifest_activities" DROP CONSTRAINT "sifest_activities_sifest_id_fkey";

-- DropTable
DROP TABLE "sifest_activities";

-- DropEnum
DROP TYPE "SIFEST_ACTIVITY";
