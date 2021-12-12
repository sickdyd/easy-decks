import styled from '@emotion/styled'
import { Deck } from '@src/components/decks/Deck'
import prisma from '@src/prisma/prismaClient'
import { useAppDispatch } from '@src/redux/hooks'
import { initializeDeck } from '@src/redux/slices/deckSlice'
import InferNextPropsType from 'infer-next-props-type'
import { GetServerSidePropsContext } from 'next'

const Wrapper = styled.main`
  height: 100%;
`

const PlayDeck = ({ deck }: InferNextPropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch()

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

  if (!deck) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      deck: { ...deck, deckIsCompleted: false, cardIndex: 0 }
    }
  }
}

export default PlayDeck
