import { CourseProperties } from "../data/const/courses.const"
import { WordsProperties } from "../data/const/words.const"
import { getValues } from "../utils/getValues"
import { tagsTransformer } from "../transformers/tags"
import { wordsTransformer } from "../transformers/words"

import lodash from "lodash"

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

export const courseItemTransformer = <
  T extends { words: IWord[]; tags: ITags[] }
>(
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
  /* const resWords: IWord[] = resCourse.words.map((item: any) => {
    return {
      ...Object.fromEntries(
        Object.values(WordsProperties).map((val) => [
          val,
          getValues(WordsProperties, item, val as string),
        ])
      ),
    } as IWord
  })
*/
  const tmp: Array<ICourseWords> = []
  tmp.push(course)

  const resWords: IWord[] = [
    ...wordsTransformer(tmp as ICourseWords[]),
  ] as IWord[]

  const resTags: ITags[] = [...tagsTransformer(tmp as ICourseTags[])] as ITags[]

  resCourse.words = [...lodash.orderBy(resWords, ["count"], ["asc"])]
  resCourse.tags = [...resTags]
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
