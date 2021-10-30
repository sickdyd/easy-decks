const dummyDeck: IDeck = {
  id: 'a',
  cardIndex: 0,
  lastCardIndex: 0,
  completedCards: [],
  deckIsCompleted: false,
  lastCardIndexes: [],
  cards: [
    {
      front: ['人口'],
      back: ['じんこう'],
      flipped: false,
      chances: 5,
      correctGuesses: 0
    },
    {
      front: ['暑い'],
      back: ['あつい'],
      flipped: false,
      chances: 5,
      correctGuesses: 0
    },
    {
      front: ['黒い'],
      back: ['くろい'],
      flipped: false,
      chances: 5,
      correctGuesses: 0
    },
    {
      front: ['書く'],
      back: ['かく'],
      flipped: false,
      chances: 5,
      correctGuesses: 0
    },
    {
      front: ['乾く'],
      back: ['かわく'],
      flipped: false,
      chances: 5,
      correctGuesses: 0
    }
  ]
} as IDeck

export const dummyDecks: IDeck[] = [dummyDeck, dummyDeck]
