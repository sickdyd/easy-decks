import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { dummyDeck } from '@src/decks/dummyDeck'
import type { RootState } from '@src/redux/store'

export const MIN_CORRECT_GUESSES = 5

const getCardIndexByChance = (state: IDeck) => {
  let newCardIndex = state.lastCardIndex

  const uncompletedCards = state.cards.filter(({ chances }) => chances > 0)

  if (uncompletedCards.length === 1) {
    newCardIndex = state.cards.indexOf(uncompletedCards[0])
    state.cards[state.cards.indexOf(uncompletedCards[0])].chances = 0
  } else {
    while (newCardIndex === state.lastCardIndex && uncompletedCards.length > 0) {
      const allChances = state.cards.map(({ chances }) => Math.random() * chances)
      const maxValue = Math.max(...allChances)

      newCardIndex = allChances.indexOf(maxValue)
    }
  }

  return newCardIndex
}

const deckIsCompleted = (state: IDeck) =>
  !(state.cards.filter(({ chances }) => chances > 0).length > 0)

export const deckSlice = createSlice({
  name: 'deck',
  initialState: dummyDeck,
  reducers: {
    initializeDeck: (state, action: PayloadAction<IDeck>) => {
      state.cards = action.payload.cards
      state.cards = state.cards.map((card) => ({ ...card, chanches: MIN_CORRECT_GUESSES }))
      state.cardIndex = 0
      state.lastCardIndex = 0
      state.lastCardIndexes = []
      state.deckIsCompleted = false
    },
    flipCard: (state) => {
      state.cards[state.cardIndex].flipped = true
    },
    guessCard: (state, { payload: success }: PayloadAction<boolean>) => {
      state.cards[state.cardIndex].chances += success ? -1 : 0
      state.cards[state.cardIndex].flipped = false
      state.deckIsCompleted = deckIsCompleted(state)

      const newCardIndex = getCardIndexByChance(state)
      state.lastCardIndexes.push(newCardIndex)
      state.lastCardIndexes.length > state.cards.length && state.lastCardIndexes.shift()
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
