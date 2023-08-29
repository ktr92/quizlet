/*
  Warnings:

  - You are about to drop the column `coursesCourse_id` on the `Words` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_coursesCourse_id_fkey";

-- AlterTable
ALTER TABLE "Words" DROP COLUMN "coursesCourse_id";

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_courseitem_id_fkey" FOREIGN KEY ("courseitem_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
