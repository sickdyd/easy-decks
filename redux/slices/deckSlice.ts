import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dummyDeck } from '@src/decks/dummyDeck'
import type { RootState } from '@src/redux/store'

const getCardIndexByChance = (state: IDeck) => {
  let newCardIndex = state.lastCardIndex

  while (newCardIndex === state.lastCardIndex && state.cards.length > 1) {
    const allChances = state.cards.map(({ chances }) => Math.random() * chances)
    newCardIndex = allChances.reduce(
      (a, b, i) => (a[0] < b ? [b, i] : a),
      [Number.MIN_VALUE, -1]
    )[1]
  }

  return newCardIndex
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState: dummyDeck,
  reducers: {
    initializeDeck: (state, action: PayloadAction<IDeck>) => {
      state.cards = action.payload.cards
      state.cardIndex = 0
      state.deckIsCompleted = false
      state.completedCards = []
    },
    flipCard: (state) => {
      state.cards[state.cardIndex].flipped = true
    },
    guessCard: (state, { payload: success }: PayloadAction<boolean>) => {
      const percentageToRemove = Math.floor(100 / state.cards.length / 10)

      state.cards[state.cardIndex].chances += success ? -percentageToRemove : percentageToRemove
      state.cards[state.cardIndex].chances < 1 && (state.cards[state.cardIndex].chances = 1)
      state.cards[state.cardIndex].flipped = false

      const newCardIndex = getCardIndexByChance(state)
      state.lastCardIndex = newCardIndex
      state.cardIndex = newCardIndex
    }
  }
})

export const { initializeDeck, flipCard, guessCard } = deckSlice.actions

export const selectDeck = (state: RootState) => state.deck.cards
export const selectcardIndex = (state: RootState) => state.deck.cardIndex
export const selectDeckIsComplete = (state: RootState) => state.deck.deckIsCompleted

export default deckSlice.reducer
