type IDecks = IDeck[]

interface IDeck {
  id: string
  cardIndex: number
  lastCardIndex: number
  cards: ICard[]
  completedCards: ICard[]
  deckIsCompleted: boolean
  lastCardIndexes: number[]
}

interface ICard {
  front: string[]
  back: string[]
  flipped: boolean
  chances: number
  correctGuesses: number
}
