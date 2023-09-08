-- DropForeignKey
ALTER TABLE "WordsOnCourses" DROP CONSTRAINT "WordsOnCourses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "WordsOnCourses" DROP CONSTRAINT "WordsOnCourses_word_id_fkey";

-- AddForeignKey
ALTER TABLE "WordsOnCourses" ADD CONSTRAINT "WordsOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordsOnCourses" ADD CONSTRAINT "WordsOnCourses_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Words"("word_id") ON DELETE CASCADE ON UPDATE CASCADE;
