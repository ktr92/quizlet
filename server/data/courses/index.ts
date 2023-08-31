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
export async function getCoursesByTag(userId: string, tagname: number) {
  const courses = await prisma.courses.findMany({
    include: {
      course_tags: {
        select: {
          tags: true,
        },
        where: {
          tags: {
            tag_id: tagname,
          },
        },
      },
    },
    where: {
      course_user: userId,
      course_tags: {
        some: {
          tags: {
            tag_id: tagname,
          },
        },
      },
    },
  })

  return courses
}
