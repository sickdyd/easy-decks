import styled from '@emotion/styled'
import { DeckList } from '@src/components/decks/DeckList'
import { Container } from '@src/components/shared/Container'
import { DeckWithCards } from '@src/types/deck'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

export const Wrapper = styled(Container.withComponent('main'))``

const Home: NextPage = () => {
  const [decks, setDecks] = useState<DeckWithCards[]>()

  useEffect(() => {
    fetch('/api/decks').then(async (response) => {
      if (response.status === 200) {
        const decks = JSON.parse(await response.text()) as DeckWithCards[]

        setDecks(decks)
      }
    })
  }, [])

  if (!decks) {
    return null
  }

  return (
    <Wrapper>
      <DeckList decks={decks} />
    </Wrapper>
  )
}

export default Home
