import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const course = await prisma.courses.create({
    data: {
      course_user: body.user,
      course_title: body.title,
      course_description: body.description,
    },
  })

  body.words.forEach(async (item: IWord) => {
    await prisma.words.create({
      data: {
        word_dt: item.dt,
        word_dd: item.dd,
        courseitem_id: course.course_id,
      },
    })
  })

  return course
})
