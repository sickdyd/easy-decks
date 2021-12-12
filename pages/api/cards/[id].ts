import { cardUpdateHandler } from '@src/api-handlers/cards/id/update'
import { DeckWithCards } from '@src/types/deck'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeckWithCards[] | string>
) {
  const cardId = parseInt(req.query.id as string)

  if (req.method === 'GET') {
  } else if (req.method === 'PATCH') {
    await cardUpdateHandler({ req, res, prisma, id: cardId })
  } else if (req.method === 'POST') {
  } else if (req.method === 'DELETE') {
  } else {
    res.status(404).send('Invalid request method.')
  }
}
