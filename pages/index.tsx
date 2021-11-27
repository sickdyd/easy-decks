import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { DeckList } from '@src/components/decks/DeckList'
import { Container } from '@src/components/shared/Container'
import prisma from '@src/prisma/prismaClient'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

export const Wrapper = styled(Container.withComponent('main'))``

const Home = ({ decks }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper>
      <DeckList decks={decks} />
      <a href="https://www.freepik.com/vectors/travel">
        Travel vector created by macrovector - www.freepik.com
      </a>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps<{ decks: Deck[] }> = async () => {
  const decks = await prisma.deck.findMany()

  return {
    props: {
      decks
    },
    revalidate: 60
  }
}

export default Home
