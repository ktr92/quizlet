import { getCoursesByUser } from "../../data/courses"

export default defineEventHandler(async (event) => {
  /*  const query = getQuery(event) */
  const userId = event.context.params?.id as string
  const courses = await getCoursesByUser(userId)

  return courses
})
