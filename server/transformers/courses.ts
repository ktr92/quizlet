import { CourseProperties } from "../data/const/courses.const"
import { getValues } from "../utils/getValues"

export const coursesTransformer = <T>(courses: ICourseTags[]): Array<T> => {
  const result = courses.map((item): T => {
    return {
      ...(Object.fromEntries(
        Object.values(CourseProperties).map((val) => [
          val,
          getValues(CourseProperties, item, val as string),
        ])
      ) as T),
    }
  })
  return result
}

export const courseItemTransformer = <T>(courses: ICourseWords[]): Array<T> => {
  const result = courses.map((item): T => {
    return {
      ...(Object.fromEntries(
        Object.values(CourseProperties).map((val) => [
          val,
          getValues(CourseProperties, item, val as string),
        ])
      ) as T),
    }
  })
  return result
}
