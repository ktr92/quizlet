import { getCoursesByTag } from "../../data/courses"
import { coursesTransformer } from "../../transformers/courses"

export default defineEventHandler(async (event) => {
  const { tag } = getQuery(event)
  const userId = event.context.params?.id as string
  const courses = await getCoursesByTag(userId, String(tag))
  return [...coursesTransformer(courses as unknown as ICourseTags[])]
})
