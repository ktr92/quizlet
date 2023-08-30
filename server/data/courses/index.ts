import prisma from "../prisma"

export async function getCoursesByUser(userId: string) {
  const courses = await prisma.courses.findMany({
    include: {
      course_tags: {
        include: {
          tags: true,
        },
      },
    },
    where: {
      course_user: userId,
    },
  })

  return courses
}
