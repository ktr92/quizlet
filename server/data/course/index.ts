import prisma from "../prisma"

export async function getCourseById(userId: string, courseId: number) {
  const courses = await prisma.courses.findFirst({
    include: {
      couesritem_words: true,
      course_tags: {
        include: {
          tags: true,
        },
      },
    },

    where: {
      course_user: userId,
      course_id: courseId,
    },
  })

  return courses
}
export async function removeCourseById(userId: string, courseId: number) {
  const courses = await prisma.courses.update({
    data: {
      course_archived: true,
    },
    where: {
      course_user: userId,
      course_id: courseId,
    },
  })

  return courses
}

export async function updateCourseById(userId: string, body: any) {
  console.log([...body.course_tags])
  const courses = await prisma.courses.update({
    where: {
      course_id: Number(body.course_id),
      course_user: userId,
    },
    data: {
      course_count: body.course_count,
      course_title: body.course_title,
      course_tags: {
        deleteMany: {
          course_id: Number(body.course_id),
        },
        create: body.course_tags.map((item: string) => ({
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
      couesritem_words: {
        upsert: body.couesritem_words.map((item: IWord) => ({
          words: {
            create: {
              word_dt: item.dt,
              word_dd: item.dd,
              word_count: item.count,
              courseitem_id: body.course_id,
            },
            update: {
              word_dt: item.dt,
              word_dd: item.dd,
              word_count: item.count,
              courseitem_id: body.course_id,
            },
          },
        })),
      },
    },
  })

  body.couesritem_words.forEach(async (item: IWord) => {
    await prisma.words.upsert({
      where: {
        word_id: body.course_id,
        courseitem_id: body.course_id,
      },
      update: {
        word_dt: item.dt,
        word_dd: item.dd,
        word_count: item.count,
        courseitem_id: body.course_id,
      },
      create: {
        word_dt: item.dt,
        word_dd: item.dd,
        word_count: item.count,
        courseitem_id: body.course_id,
      },
    })
  })

  /* const courses = await prisma.courses.update({
    data: {
      course_archived: body.course_archived,
      course_count: body.course_count,
      course_title: body.course_title,
      course_tags: {
        create: body.course_tags.map((item: string) => ({
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
    },
    where: {
      course_user: userId,
      course_id: body.course_id,
    },
  })

  body.couesritem_words.forEach(async (item: IWord) => {
    await prisma.words.upsert({
      update: {
        word_dt: item.dt,
        word_dd: item.dd,
        word_count: item.count,
      },
      create: {
        word_dt: item.dt,
        word_dd: item.dd,
        word_count: item.count,
        courseitem_id: body.course_id,
      },
      where: {
        courseitem_id: body.course_id,
      },
    })
  })  */

  return courses
}
