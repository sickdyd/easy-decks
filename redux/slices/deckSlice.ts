import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLesserKnownCard } from '@src/cards-logic/getLesserKnownCard'
import { RootState } from '@src/redux/store'
import { Card } from '@src/types/card'
import { DeckWithCards } from '@src/types/deck'
import axios from 'axios'

export const patchCard = createAsyncThunk(
  'deck/patchCard',
  async ({ success, card }: { success: boolean; card: Card }) => {
    const guesses = success ? card.guesses - 1 : card.guesses + 1
    const response = await axios.patch(`/api/cards/${card.id}`, { guesses })
    const updatedCard = await response.data

    return updatedCard
  }
)

const deckIsCompleted = (state: DeckWithCards) =>
  state.cards.filter(({ viewed }) => !viewed).length === 0

export const deckSlice = createSlice({
  name: 'deck',
  initialState: {} as DeckWithCards,
  reducers: {
    initializeDeck: (state: DeckWithCards, action: PayloadAction<DeckWithCards>) => {
      state.cards = action.payload.cards
      state.cards = state.cards.map((card) => ({ ...card, viewed: false, flipped: false }))
      state.cardIndex = getLesserKnownCard(state)
      state.deckIsCompleted = false
    },
    flipCard: (state: DeckWithCards) => {
      state.cards[state.cardIndex].flipped = true
    }
  },
  extraReducers: {
    [patchCard.pending.type]: (state, action) => {
      console.log('Patch card loading...')
    },
    [patchCard.fulfilled.type]: (state: DeckWithCards, { payload }: PayloadAction<Card>) => {
      state.cards[state.cardIndex].guesses = payload.guesses || state.cards[state.cardIndex].guesses
      state.cards[state.cardIndex].flipped = false
      state.cards[state.cardIndex].viewed = true
      state.deckIsCompleted = deckIsCompleted(state)
      state.cardIndex = state.deckIsCompleted ? 0 : getLesserKnownCard(state)
      console.log('Patch card done!')
    },
    [patchCard.rejected.type]: (state, action) => {
      console.log('Patch card error...')
    }
  }
})

export const { initializeDeck, flipCard } = deckSlice.actions

export const selectDeck = (state: RootState) => state.deck.cards
export const selectcardIndex = (state: RootState) => state.deck.cardIndex
export const selectDeckIsComplete = (state: RootState) => state.deck.deckIsCompleted

export default deckSlice.reducer
