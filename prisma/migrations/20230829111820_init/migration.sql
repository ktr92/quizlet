/*
  Warnings:

  - You are about to drop the `_CoursesToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_courseitem_id_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesToTags" DROP CONSTRAINT "_CoursesToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesToTags" DROP CONSTRAINT "_CoursesToTags_B_fkey";

-- AlterTable
ALTER TABLE "Words" ADD COLUMN     "coursesCourse_id" INTEGER;

-- DropTable
DROP TABLE "_CoursesToTags";

-- CreateTable
CREATE TABLE "TagsOnCourses" (
    "course_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "TagsOnCourses_pkey" PRIMARY KEY ("course_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_coursesCourse_id_fkey" FOREIGN KEY ("coursesCourse_id") REFERENCES "Courses"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCourses" ADD CONSTRAINT "TagsOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCourses" ADD CONSTRAINT "TagsOnCourses_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;
