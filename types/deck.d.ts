type IDecks = IDeck[]

interface IDeck {
  id: number
  name: string
  cardIndex: number
  lastCardIndex: number
  cards: ICard[]
  deckIsCompleted: boolean
  lastCardIndexes: number[]
}

interface ICard {
  front: string[]
  back: string[]
  flipped: boolean
  chances: number
}
