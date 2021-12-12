import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLesserKnownCard } from '@src/cards-logic/getLesserKnownCard'
import { RootState } from '@src/redux/store'
import { DeckWithCards } from '@src/types/deck'

export const INITIAL_CHANCES = 0

const deckIsCompleted = (state: DeckWithCards) =>
  state.cards.filter(({ viewed }) => !viewed).length === 0

export const deckSlice = createSlice({
  name: 'deck',
  initialState: {} as DeckWithCards,
  reducers: {
    initializeDeck: (state: DeckWithCards, action: PayloadAction<DeckWithCards>) => {
      state.cards = action.payload.cards
      state.cards = state.cards.map((card) => ({ ...card, viewed: false }))
      state.cardIndex = getLesserKnownCard(state)
      state.deckIsCompleted = false
    },
    flipCard: (state: DeckWithCards) => {
      state.cards[state.cardIndex].flipped = true
    },
    guessCard: (state: DeckWithCards, { payload: success }: PayloadAction<boolean>) => {
      state.cards[state.cardIndex].guesses += success ? -1 : 1
      state.cards[state.cardIndex].flipped = false
      state.cards[state.cardIndex].viewed = true
      state.deckIsCompleted = deckIsCompleted(state)
      state.cardIndex = state.deckIsCompleted ? 0 : getLesserKnownCard(state)
    }
  }
})

export const { initializeDeck, flipCard, guessCard } = deckSlice.actions

export const selectDeck = (state: RootState) => state.deck.cards
export const selectcardIndex = (state: RootState) => state.deck.cardIndex
export const selectDeckIsComplete = (state: RootState) => state.deck.deckIsCompleted

export default deckSlice.reducer
