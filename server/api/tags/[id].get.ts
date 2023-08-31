import { getCoursesByUser } from "../../data/courses"
import { tagsTransformer } from "../../transformers/tags"

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id as string

  const courses = await getCoursesByUser(userId)
  return [...tagsTransformer(courses as unknown as ICourseTags[])]
})
