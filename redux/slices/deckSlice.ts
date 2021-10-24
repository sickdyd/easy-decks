import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@src/redux/store'

const initialState: IDeck = {
  cardCompletionCorrectGuesses: 10,
  cardIndex: 0,
  cards: [
    {
      id: 0,
      front: ['学生'],
      back: ['がくせい'],
      flipped: false,
      chances: 50
    },
    {
      id: 1,
      front: ['先生'],
      back: ['せんせい'],
      flipped: false,
      chances: 50
    }
  ]
} as IDeck

const chancesToRemove = (deck: IDeck) => 100 / deck.cards.length / deck.cardCompletionCorrectGuesses

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    flipCard: (state, action: PayloadAction<number>) => {
      state.cards[action.payload].flipped = true
    },
    adjustCardsChancesToShow: (state, action: PayloadAction<number>) => {
      const percentageToRemove = chancesToRemove(state)
      state.cards[action.payload].chances -= percentageToRemove
      const amountForEachCard = percentageToRemove / (state.cards.length - 1)
      state.cards.forEach(
        (card, index) => index !== state.cardIndex && (card.chances += amountForEachCard)
      )
    },
    changeCard: (state) => {
      state.cards[state.cardIndex].flipped = false
      state.cardIndex = state.cardIndex >= state.cards.length - 1 ? 0 : state.cardIndex + 1
    }
  }
})

export const { flipCard, adjustCardsChancesToShow, changeCard } = deckSlice.actions

export const selectDeck = (state: RootState) => state.deck.cards
export const selectcardIndex = (state: RootState) => state.deck.cardIndex

export default deckSlice.reducer
