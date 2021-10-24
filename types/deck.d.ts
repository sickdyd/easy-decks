interface IDeck {
  cardIndex: number
  lastCardIndex: number
  cards: ICard[]
  completedCards: ICard[]
  deckIsCompleted: boolean
}

interface ICard {
  front: string[]
  back: string[]
  flipped: boolean
  chances: number
  correctGuesses: number
}
