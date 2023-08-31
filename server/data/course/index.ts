import prisma from "../prisma"

export async function getCourseById(userId: string, courseId: number) {
  const courses = await prisma.courses.findFirst({
    include: {
      couesritem_words: true,
    },
    where: {
      course_user: userId,
      course_id: courseId,
    },
  })

  return courses
}
