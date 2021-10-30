import type { NextPage } from 'next'
import { DeckList } from '@src/components/decks/DeckList'
import styled from '@emotion/styled'
import { Container } from '@src/components/shared/Container'
import { dummyDecks } from '@src/decks/dummyDecks'

export const Wrapper = styled(Container)``

const Home: NextPage = () => {
  return (
    <Wrapper>
      <DeckList decks={dummyDecks} />
    </Wrapper>
  )
}

export default Home
