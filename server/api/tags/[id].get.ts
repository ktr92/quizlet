import { getCoursesByUser, getCoursesByTag } from "../../data/courses"
import { coursesTransformer } from "../../transformers/courses"
import { tagsTransformer } from "../../transformers/tags"

export default defineEventHandler(async (event) => {
  const { tag } = getQuery(event)
  const userId = event.context.params?.id as string
  if (tag) {
    const courses = await getCoursesByTag(userId, Number(tag))
    return [...coursesTransformer(courses as unknown as ICourseTags[])]
  }
  const courses = await getCoursesByUser(userId)
  return [...tagsTransformer(courses as unknown as ICourseTags[])]
})
