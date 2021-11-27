import { DeckWithCards } from '@src/types/deck'

export async function decksPostHandler({ req, res, prisma }: RequestHandler) {
  const { name, cards } = req.body as DeckWithCards

  const deck = await prisma.deck.create({
    data: {
      name,
      cardIndex: 0,
      lastCardIndex: 0,
      deckIsCompleted: false,
      lastCardIndexes: [],
      cards: { create: cards }
    }
  })

  res.status(200).send(deck)
}
