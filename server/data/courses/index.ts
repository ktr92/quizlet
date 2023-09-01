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
      course_archived: false,
    },
  })

  return courses
}
export async function getCoursesByTag(userId: string, tagname: string) {
  const courses = await prisma.courses.findMany({
    include: {
      course_tags: {
        select: {
          tags: true,
        },
      },
    },
    where: {
      course_user: userId,
      course_archived: false,
      course_tags: {
        some: {
          tags: {
            tag_title: tagname,
          },
        },
      },
    },
  })

  return courses
}
