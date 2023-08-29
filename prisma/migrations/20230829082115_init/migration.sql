/*
  Warnings:

  - A unique constraint covering the columns `[tag_title]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tags_tag_title_key" ON "Tags"("tag_title");
