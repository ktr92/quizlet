import { CourseProperties } from "../data/const/courses.const"
import { WordsProperties } from "../data/const/words.const"
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

export const courseItemTransformer = <T extends { words: IWord[] }>(
  course: ICourseWords
): T => {
  let resCourse = {
    ...Object.fromEntries(
      Object.values(CourseProperties).map((val) => [
        val,
        getValues(CourseProperties, course, val as string),
      ])
    ),
  } as T

  const resWords: IWord[] = resCourse.words.map((item: any) => {
    return {
      ...Object.fromEntries(
        Object.values(WordsProperties).map((val) => [
          val,
          getValues(WordsProperties, item, val as string),
        ])
      ),
    } as IWord
  })

  resCourse.words = [...resWords]

  return resCourse
}
export const courseItemRemove = <T extends { words: IWord[] }>(
  course: ICourseWords
): T => {
  let resCourse = {
    ...Object.fromEntries(
      Object.values(CourseProperties).map((val) => [
        val,
        getValues(CourseProperties, course, val as string),
      ])
    ),
  } as T

  const resWords: IWord[] = resCourse.words.map((item: any) => {
    return {
      ...Object.fromEntries(
        Object.values(WordsProperties).map((val) => [
          val,
          getValues(WordsProperties, item, val as string),
        ])
      ),
    } as IWord
  })

  resCourse.words = [...resWords]

  return resCourse
}
