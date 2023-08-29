import { getCoursesByUser } from "../../data/courses"

export default defineEventHandler(async (event) => {
  /*  const query = getQuery(event) */
  const userId = event.context.params?.id as string
  const courses = await getCoursesByUser(userId)

  if ((courses as any).id) {
    return { ...courses }
  }

  return sendError(
    event,
    createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    })
  )
})
