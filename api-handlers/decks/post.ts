import { DeckWithCards } from '@src/types/deck'

export async function decksPostHandler({ req, res, prisma }: RequestHandler) {
  const { name, cards } = req.body as DeckWithCards

  const deck = await prisma.deck.create({
    data: {
      name,
      cards: { create: cards }
    }
  })

  res.status(200).send(deck)
}
