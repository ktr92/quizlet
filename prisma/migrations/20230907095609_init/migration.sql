/*
  Warnings:

  - Changed the type of `word_idcourse` on the `Words` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Words" DROP COLUMN "word_idcourse",
ADD COLUMN     "word_idcourse" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Words_word_idcourse_key" ON "Words"("word_idcourse");
