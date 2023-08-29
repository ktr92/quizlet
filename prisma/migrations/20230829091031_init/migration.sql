/*
  Warnings:

  - You are about to drop the column `course_description` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the `_CoursesToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CoursesToTags" DROP CONSTRAINT "_CoursesToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesToTags" DROP CONSTRAINT "_CoursesToTags_B_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "course_description";

-- DropTable
DROP TABLE "_CoursesToTags";
