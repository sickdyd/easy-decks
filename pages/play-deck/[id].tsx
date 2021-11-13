import styled from '@emotion/styled'
import { Deck } from '@src/components/decks/Deck'
import { NotFound } from '@src/components/NotFound'
import { Container } from '@src/components/shared/Container'
import prisma from '@src/prisma/prismaClient'
import { useAppDispatch } from '@src/redux/hooks'
import { initializeDeck } from '@src/redux/slices/deckSlice'
import InferNextPropsType from 'infer-next-props-type'
import { GetServerSidePropsContext } from 'next'

const Wrapper = styled(Container.withComponent('main'))``

const PlayDeck = ({ deck }: InferNextPropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch()

  if (!deck) {
    return (
      <NotFound
        message="The deck you are looking for was not found..."
        buttonLabel="Back to Decks list"
        buttonUrl="/"
      />
    )
  }

  dispatch(initializeDeck(deck))

  return (
    <Wrapper>
      <Deck />
    </Wrapper>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = parseInt(context?.params?.id as string)
  const deck = await prisma.deck.findUnique({ where: { id }, include: { cards: true } })

  return {
    props: {
      deck
    }
  }
}

export default PlayDeck
