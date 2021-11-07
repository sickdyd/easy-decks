import { PrismaClient } from '.prisma/client'
import { DeckWithCards } from '@src/types/deck'
import { NextApiRequest, NextApiResponse } from 'next'

export async function deckGetHandler({
  req,
  res,
  prisma,
  deckId
}: {
  req: NextApiRequest
  res: NextApiResponse<DeckWithCards[] | string>
  prisma: PrismaClient
  deckId: number
}) {
  const deck = await prisma.deck.findUnique({ where: { id: deckId }, include: { cards: true } })

  if (deck) {
    res.status(200).send(JSON.stringify(deck))
  } else {
    res.status(404).send('Not found')
  }
}
