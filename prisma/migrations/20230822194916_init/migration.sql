-- CreateTable
CREATE TABLE "Courses" (
    "course_id" SERIAL NOT NULL,
    "course_user" UUID NOT NULL,
    "course_title" TEXT NOT NULL,
    "course_description" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "CourseItem" (
    "courseitem_id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "CourseItem_pkey" PRIMARY KEY ("courseitem_id")
);

-- CreateTable
CREATE TABLE "Words" (
    "word_id" SERIAL NOT NULL,
    "word_dt" TEXT NOT NULL,
    "word_dd" TEXT NOT NULL,
    "courseitem_id" INTEGER NOT NULL,

    CONSTRAINT "Words_pkey" PRIMARY KEY ("word_id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tag_id" SERIAL NOT NULL,
    "tag_title" TEXT NOT NULL,
    "coursesCourse_id" INTEGER NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tag_id")
);

-- AddForeignKey
ALTER TABLE "CourseItem" ADD CONSTRAINT "CourseItem_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_courseitem_id_fkey" FOREIGN KEY ("courseitem_id") REFERENCES "CourseItem"("courseitem_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_coursesCourse_id_fkey" FOREIGN KEY ("coursesCourse_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
