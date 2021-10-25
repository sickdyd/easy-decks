import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dummyDeck } from '@src/decks/dummyDeck'
import type { RootState } from '@src/redux/store'

const getCardIndexByChance = (state: IDeck) => {
  let newCardIndex = state.lastCardIndex
  let cardsNotRecentlyDrawn: number[] = []

  if (state.lastCardIndexes.length >= state.cards.length * 3) {
    state.cards.forEach((_, index) => {
      if (!state.lastCardIndexes.includes(index)) {
        cardsNotRecentlyDrawn.push(index)
      }
    })
  }

  if (cardsNotRecentlyDrawn.length > 0) {
    newCardIndex = cardsNotRecentlyDrawn[0]
  } else {
    while (newCardIndex === state.lastCardIndex && state.cards.length > 1) {
      const allChances = state.cards.map(({ chances }) => Math.random() * chances)
      const maxValue = Math.max(...allChances)
      newCardIndex = allChances.indexOf(maxValue)
    }
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
      state.lastCardIndex = 0
      state.lastCardIndexes.push(0)
      state.deckIsCompleted = false
      state.completedCards = []
    },
    flipCard: (state) => {
      state.cards[state.cardIndex].flipped = true
    },
    guessCard: (state, { payload: success }: PayloadAction<boolean>) => {
      state.cards[state.cardIndex].chances += success ? -20 : 0
      state.cards[state.cardIndex].chances <= 0 && (state.cards[state.cardIndex].chances = 0)
      state.cards[state.cardIndex].flipped = false

      const newCardIndex = getCardIndexByChance(state)
      state.lastCardIndexes.push(newCardIndex)
      state.lastCardIndexes.length > state.cards.length * 3 && state.lastCardIndexes.shift()
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
