import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { DeckList } from '@src/components/decks/DeckList'
import { Container } from '@src/components/shared/Container'
import prisma from '@src/prisma/prismaClient'
import type { GetServerSideProps, InferGetStaticPropsType } from 'next'

export const Wrapper = styled(Container.withComponent('main'))``

const Home = ({ decks }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper>
      <DeckList decks={decks} />
      {/* <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">
          photo3idea_studio
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div> */}

      <a href="https://www.freepik.com/photos/pattern">
        Pattern photo created by rawpixel.com - www.freepik.com
      </a>
    </Wrapper>
  )
}

export const getStaticProps: GetServerSideProps<{ decks: Deck[] }> = async () => {
  const decks = await prisma.deck.findMany()

  return {
    props: {
      decks
    }
  }
}

export default Home
