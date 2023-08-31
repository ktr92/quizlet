import { getCourseById } from "../../data/course"
import { courseItemTransformer } from "../../transformers/courses"

export default defineEventHandler(async (event) => {
  const { courseId } = getQuery(event)
  const userId = event.context.params?.id as string
  const course = await getCourseById(userId, Number(courseId))
  return [...courseItemTransformer(course as unknown as ICourseWords[])]
})
