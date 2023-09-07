import { WordsProperties } from "../data/const/words.const"
import { getValues } from "../utils/getValues"

export const wordsTransformer = <T>(courses: ICourseWords[]): Array<T> => {
  let totalwords = courses.map((item) => {
    return item.course_words.map((word: any) => {
      return word.words
    })
  })[0]

  const result = totalwords.map((item: any): T => {
    return {
      ...(Object.fromEntries(
        Object.values(WordsProperties).map((val) => [
          val,
          getValues(WordsProperties, item, val as string),
        ])
      ) as T),
    }
  })

  return result
}
