/*
  Warnings:

  - You are about to drop the column `coursesCourse_id` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_coursesCourse_id_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "coursesCourse_id";

-- CreateTable
CREATE TABLE "TagsOnCourses" (
    "course_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "TagsOnCourses_pkey" PRIMARY KEY ("course_id","tag_id")
);

-- CreateTable
CREATE TABLE "_CoursesToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToTags_AB_unique" ON "_CoursesToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToTags_B_index" ON "_CoursesToTags"("B");

-- AddForeignKey
ALTER TABLE "TagsOnCourses" ADD CONSTRAINT "TagsOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCourses" ADD CONSTRAINT "TagsOnCourses_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToTags" ADD CONSTRAINT "_CoursesToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToTags" ADD CONSTRAINT "_CoursesToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
