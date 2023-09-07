/*
  Warnings:

  - You are about to drop the column `courseitem_id` on the `Words` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_courseitem_id_fkey";

-- AlterTable
ALTER TABLE "Words" DROP COLUMN "courseitem_id";

-- CreateTable
CREATE TABLE "WordsOnCourses" (
    "course_id" INTEGER NOT NULL,
    "word_id" INTEGER NOT NULL,

    CONSTRAINT "WordsOnCourses_pkey" PRIMARY KEY ("course_id","word_id")
);

-- AddForeignKey
ALTER TABLE "WordsOnCourses" ADD CONSTRAINT "WordsOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordsOnCourses" ADD CONSTRAINT "WordsOnCourses_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Words"("word_id") ON DELETE RESTRICT ON UPDATE CASCADE;
