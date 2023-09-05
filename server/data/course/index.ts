import prisma from "../prisma"

export async function getCourseById(userId: string, courseId: number) {
  const courses = await prisma.courses.findFirst({
    include: {
      couesritem_words: true,
      course_tags: {
        include: {
          tags: true,
        },
      },
    },
    
    where: {
      course_user: userId,
      course_id: courseId,
    },
  })

  return courses
}
export async function removeCourseById(userId: string, courseId: number) {
  console.log(courseId)
  const courses = await prisma.courses.update({
    data: {
      course_archived: true,
    },
    where: {
      course_user: userId,
      course_id: courseId,
    },
  })

  return courses
}
