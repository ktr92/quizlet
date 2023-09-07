import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const course = await prisma.courses.create({
    data: {
      course_user: body.user,
      course_title: body.title,
      course_count: body.words.length,
      course_tags: {
        create: body.description.map((item: string) => ({
          tags: {
            connectOrCreate: {
              where: {
                tag_title: item,
              },
              create: {
                tag_title: item,
              },
            },
          },
        })),
      },
      course_words: {
        create: body.words.map((item: IWord) => ({
          words: {
            connectOrCreate: {
              where: {
                word_idcourse: item.id,
              },
              create: {
                word_idcourse: item.id,
                word_dt: item.dt,
                word_dd: item.dd,
                word_count: item.count,
              },
            },
          },
        })),
      },
    },
  })

  /*   body.words.forEach(async (item: IWord) => {
    await prisma.words.create({
      data: {
        word_dt: item.dt,
        word_dd: item.dd,
        word_count: item.count,
        courseitem_id: course.course_id,
      },
    })
  }) */

  return course
})
