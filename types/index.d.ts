export {}

const courseWithTags = Prisma.validator<Prisma.CoursesArgs>()({
  include: {
    course_tags: {
      include: {
        tags: true,
      },
    },
  },
})
const courseWithWords = Prisma.validator<Prisma.CoursesArgs>()({
  include: {
    couesritem_words: true,
  },
})

type courseWithTags = Prisma.CoursesGetPayload<typeof courseWithTags>

type courseWithWords = Prisma.CoursesGetPayload<typeof courseWithWords>

declare global {
  interface ICard {
    dt: string
    dd: string
  }
  interface IWord {
    dt: string
    dd: string
    count: number
  }

  interface ICourse {
    id: number
    title: string
    tags: Array
    count: number
  }
  interface ICourseIndexed extends ICourse {
    [property: string]: any
  }
  interface ICourseTags extends courseWithTags {
    id: number
    title: string
    tags: Array
    count: number
    tags: Array
    course_tags: Array
  }

  interface ITags {
    id: number
    title: string
  }

  interface ICourseWords extends courseWithWords, ICourseIndexed {
    id: number
    title: string
    tags: Array
    count: number
    words: Array<IWord>
    course_tags: Array<ITags>

  }
}
