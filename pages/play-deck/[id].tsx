import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Deck } from '@src/components/decks/Deck'
import { Container } from '@src/components/shared/Container'
import { NextPage } from 'next'
import { dummyDecks } from '@src/decks/dummyDecks'
import { useAppDispatch } from '@src/redux/hooks'
import { initializeDeck } from '@src/redux/slices/deckSlice'

const Wrapper = styled(Container.withComponent('main'))``

const PlayDeck: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query

  const deck = (deckId?: string) => dummyDecks.find((deck) => deck.id === deckId)

  // TODO: handle missing deck
  if (!deck) {
    return null
  }

  dispatch(initializeDeck(deck(id as string)!))

  return (
    <Wrapper>
      <Deck />
    </Wrapper>
  )
}

export default PlayDeck
