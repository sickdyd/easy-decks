type IDeck = ICard[]

interface ICard {
  id: string | number
  front: string[]
  back: string[]
  flipped: boolean
  chances: number
}
