import { CourseProperties } from "../data/const/courses.const"

export const coursesTransformer = <T>(courses: ICourseTags[]): Array<T> => {
  const result = courses.map((item): T => {
    return {
      ...(Object.fromEntries(
        Object.values(CourseProperties).map((val) => [
          val,
          getValues(item, val),
        ])
      ) as T),
    }
  })
  return result
}

const getValues = (item: ICourseIndexed, val: string) => {
  const indexOfVal = Object.values(CourseProperties).indexOf(
    val as unknown as CourseProperties
  )
  const key = Object.keys(CourseProperties)[indexOfVal]
  return item[key]
}
