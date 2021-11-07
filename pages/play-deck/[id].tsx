import styled from '@emotion/styled'
import { Deck } from '@src/components/decks/Deck'
import { Container } from '@src/components/shared/Container'
import { useAppDispatch, useAppSelector } from '@src/redux/hooks'
import { initializeDeck, selectDeck } from '@src/redux/slices/deckSlice'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Wrapper = styled(Container.withComponent('main'))``

const PlayDeck: NextPage = () => {
  const deck = useAppSelector(selectDeck)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const deckId = router.query.id

  useEffect(() => {
    deckId &&
      fetch(`/api/decks/${deckId}`).then(async (response) => {
        const deck = JSON.parse(await response.text())

        dispatch(initializeDeck(deck))
      })
  }, [deckId])

  if (!deck) {
    return null
  }

  return (
    <Wrapper>
      <Deck />
    </Wrapper>
  )
}

export default PlayDeck
