/*
  Warnings:

  - You are about to drop the `CourseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseItem" DROP CONSTRAINT "CourseItem_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_courseitem_id_fkey";

-- AlterTable
ALTER TABLE "Words" ADD COLUMN     "coursesCourse_id" INTEGER;

-- DropTable
DROP TABLE "CourseItem";

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_coursesCourse_id_fkey" FOREIGN KEY ("coursesCourse_id") REFERENCES "Courses"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;
