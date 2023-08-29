export { ICard }

const productDescription =
  Prisma.validator<Prisma.oc_product_descriptionArgs>()({
    include: {
      product_description: true,
    },
  })

const categoryWithRelations = Prisma.validator<Prisma.oc_categoryArgs>()({
  include: { oc_category_description: true },
})

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
}
