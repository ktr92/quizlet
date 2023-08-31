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

type courseWithTags = Prisma.CoursesGetPayload<typeof courseWithTags>

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
}
