export { ICard }

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
}
