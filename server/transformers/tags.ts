import { TagsProperties } from "../data/const/tags.const"
import { getValues } from "../utils/getValues"

import lodash from "lodash"

export const tagsTransformer = <T>(courses: ICourseTags[]): Array<T> => {
  let totaltags = courses.map((item) => {
    return item.course_tags.map((tag: any) => {
      return tag.tags
    })
  })

  totaltags = [].concat.apply([], totaltags)
  let result = lodash.uniqBy(totaltags, "tag_id")

  result = result.map((item: any): T => {
    return {
      ...(Object.fromEntries(
        Object.values(TagsProperties).map((val) => [
          val,
          getValues(TagsProperties, item, val as string),
        ])
      ) as T),
    }
  })

  return result
}
