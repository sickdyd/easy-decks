// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { decksDeleteHandler } from '@src/api-handlers/decks/id/delete'
import { deckGetHandler } from '@src/api-handlers/decks/id/get'
import prisma from '@src/prisma/prismaClient'
import { DeckWithCards } from '@src/types/deck'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeckWithCards[] | string>
) {
  const deckId = parseInt(req.query.id as string)

  if (req.method === 'GET') {
    await deckGetHandler({ req, res, prisma, id: deckId })
  } else if (req.method === 'POST') {
    res.status(200).send('WIP')
  } else if (req.method === 'DELETE') {
    await decksDeleteHandler({ req, res, prisma, id: deckId })
  } else {
    res.status(404).send('Invalid request method.')
  }
}
