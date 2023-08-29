/*
  Warnings:

  - You are about to drop the `TagsOnCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnCourses" DROP CONSTRAINT "TagsOnCourses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnCourses" DROP CONSTRAINT "TagsOnCourses_tag_id_fkey";

-- DropTable
DROP TABLE "TagsOnCourses";

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
ALTER TABLE "_CoursesToTags" ADD CONSTRAINT "_CoursesToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToTags" ADD CONSTRAINT "_CoursesToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
