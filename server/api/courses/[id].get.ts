import { getCoursesByUser } from "../../data/courses"
import { coursesTransformer } from "../../transformers/courses"

export default defineEventHandler(async (event) => {
  /*  const query = getQuery(event) */
  const userId = event.context.params?.id as string
  const courses = await getCoursesByUser(userId)

  return [...coursesTransformer(courses as unknown as ICourseTags[])]
})
