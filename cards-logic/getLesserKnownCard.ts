import { DeckWithCards } from '@src/types/deck'

export const getLesserKnownCard = (state: DeckWithCards) => {
  const unviewedCards = state.cards.filter((card) => !card.viewed)

  const maxChancesCardId = unviewedCards.sort(
    ({ guesses: firstCardChances }, { guesses: secondCardChances }) =>
      secondCardChances - firstCardChances
  )[0].id

  const maxChancesCardIndex = state.cards.findIndex((card) => card.id === maxChancesCardId)

  return maxChancesCardIndex
}
