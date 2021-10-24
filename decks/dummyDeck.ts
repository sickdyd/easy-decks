export const dummyDeck: IDeck = {
  cardIndex: 0,
  lastCardIndex: 0,
  completedCards: [],
  deckIsCompleted: false,
  cards: [
    {
      front: ['1'],
      back: ['がくせい'],
      flipped: false,
      chances: 1,
      correctGuesses: 0
    },
    {
      front: ['2'],
      back: ['せんせい'],
      flipped: false,
      chances: 1,
      correctGuesses: 0
    },
    {
      front: ['3'],
      back: ['がくせい'],
      flipped: false,
      chances: 1,
      correctGuesses: 0
    },
    {
      front: ['4'],
      back: ['せんせい'],
      flipped: false,
      chances: 48,
      correctGuesses: 0
    },
    {
      front: ['5'],
      back: ['がくせい'],
      flipped: false,
      chances: 49,
      correctGuesses: 0
    }
  ]
} as IDeck