/*
  Warnings:

  - A unique constraint covering the columns `[word_idcourse]` on the table `Words` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `word_idcourse` to the `Words` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Words" ADD COLUMN     "word_idcourse" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Words_word_idcourse_key" ON "Words"("word_idcourse");
