import prisma from "../prisma"

export async function getCourseById(userId: string, courseId: number) {
  const courses = await prisma.courses.findFirst({
    include: {
      course_tags: {
        include: {
          tags: true,
        },
      },
      course_words: {
        include: {
          words: true,
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
export async function removeCourseById(
  userId: string,
  courseId: number,
  words: IWord[]
) {
  const relatedDelete = prisma.courses.update({
    where: {
      course_user: userId,
      course_id: courseId,
    },
    data: {
      course_words: {
        deleteMany: {},
      },
      course_tags: {
        deleteMany: {},
      },
    },
  })

  const courseDelete = prisma.courses.delete({
    where: {
      course_user: userId,
      course_id: courseId,
    },
  })

  const result = await prisma.$transaction([relatedDelete, courseDelete])

  words.forEach(async (item: IWord) => {
    await prisma.words.delete({
      where: {
        word_idcourse: item.id,
      },
    })
  })

  return result
}

export async function updateCourseById(userId: string, body: any) {
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
      course_words: {
        deleteMany: {
          course_id: Number(body.course_id),
        },
        create: body.course_words.map((item: IWord) => ({
          words: {
            connectOrCreate: {
              where: {
                word_idcourse: item.id,
              },
              create: {
                word_dt: item.dt,
                word_dd: item.dd,
                word_count: item.count,
                word_idcourse: item.id,
              },
            },
          },
        })),
      },
    },
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
  }) */

  if (body.removed_words.length) {
    body.removed_words.forEach(async (item: IWord) => {
      await prisma.words.delete({
        where: {
          word_idcourse: item.id,
        },
      })
    })
  }

  return courses
}
