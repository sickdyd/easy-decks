import type { NextPage } from 'next'
import Head from 'next/head'
import { DeckList } from '@src/components/decks/DeckList'
import { dummyDecks } from '@src/decks/dummyDecks'
import styled from '@emotion/styled'
import { Container } from '@src/components/shared/Container'

export const Wrapper = styled(Container)``

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Easy Decks</title>
        <meta name="description" content="Easily practice your decks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DeckList decks={dummyDecks} />

      <footer></footer>
    </Wrapper>
  )
}

export default Home
