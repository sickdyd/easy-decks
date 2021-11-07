import { PrismaClient } from '.prisma/client'
import { DeckWithCards } from '@src/types/deck'
import { NextApiRequest, NextApiResponse } from 'next'

export async function decksPostHandler({
  req,
  res,
  prisma
}: {
  req: NextApiRequest
  res: NextApiResponse<DeckWithCards[] | string>
  prisma: PrismaClient
}) {
  const { name, cards } = JSON.parse(req.body) as DeckWithCards

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

  res.status(200).send(JSON.stringify(deck))
}
