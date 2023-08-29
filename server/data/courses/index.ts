import prisma from "../prisma"
import { coursesTransformer } from "../../transformers/courses"

export async function getCoursesByUser(userId: string) {
  const courses = (await prisma.courses.findMany({
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
  })) as ICourseWithTags[]
  return { courses: { ...coursesTransformer<ICourse>(courses) } }

  return courses
}
