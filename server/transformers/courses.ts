import { CourseProperties } from "../data/const/courses.const"

export const coursesTransformer = <T>(
  courses: Array<ICourse>
): Array<T> => {
  const result = courses.map((item): T => {
    /*  return {
      name: getItem(item, ProductProperties.name),
    } */
    return {
      ...(Object.fromEntries(
        Object.values(CourseProperties).map((val) => [
          val,
          item[]
        ])
      ) as T),
    }
  })
  return result
}
