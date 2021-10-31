import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Deck } from '@src/components/decks/Deck'
import { Container } from '@src/components/shared/Container'
import { NextPage } from 'next'
import { useAppDispatch } from '@src/redux/hooks'
import { initializeDeck } from '@src/redux/slices/deckSlice'
import { dummyDecks } from '@src/decks/dummyDecks'

const Wrapper = styled(Container.withComponent('main'))``

const PlayDeck: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query

  const deck = dummyDecks.find((deck) => deck.id === id)

  // TODO: handle missing deck
  if (!deck) {
    return null
  }

  dispatch(initializeDeck(deck))

  return (
    <Wrapper>
      <Deck />
    </Wrapper>
  )
}

export default PlayDeck
