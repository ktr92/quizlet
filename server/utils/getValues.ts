export const getValues = (
  properties: any,
  item: ICourseIndexed,
  val: string
) => {
  const indexOfVal = Object.values(properties).indexOf(
    val as unknown as typeof properties
  )
  const key = Object.keys(properties)[indexOfVal]
  return item[key]
}
