interface IDeck {
  cardCompletionCorrectGuesses: number
  cardIndex: number
  cards: ICard[]
}

interface ICard {
  id: string | number
  front: string[]
  back: string[]
  flipped: boolean
  chances: number
}
