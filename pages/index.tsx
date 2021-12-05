import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { DeckList } from '@src/components/decks/DeckList'
import { Container } from '@src/components/shared/Container'
import prisma from '@src/prisma/prismaClient'
import type { GetServerSideProps, InferGetStaticPropsType } from 'next'

export const Wrapper = styled(Container.withComponent('main'))``

const Home = ({ decks }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(decks)

  return (
    <Wrapper>
      <DeckList decks={decks} />
    </Wrapper>
  )
}

export const getStaticProps: GetServerSideProps<{ decks: Deck[] }> = async () => {
  const decks = await prisma.deck.findMany()

  console.log(decks)

  return {
    props: {
      decks
    }
  }
}

export default Home
