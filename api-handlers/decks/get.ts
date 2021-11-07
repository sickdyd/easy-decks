import { PrismaClient } from '.prisma/client'
import { DeckWithCards } from '@src/types/deck'
import { NextApiRequest, NextApiResponse } from 'next'

export async function decksGetHandler({
  req,
  res,
  prisma
}: {
  req: NextApiRequest
  res: NextApiResponse<DeckWithCards[] | string>
  prisma: PrismaClient
}) {
  const decks = await prisma.deck.findMany()

  res.status(200).send(JSON.stringify(decks))
}
