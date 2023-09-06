import { updateCourseById } from "../../data/course"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userId = event.context.params?.id as string
  const course = await updateCourseById(userId, body)
  return course
})
