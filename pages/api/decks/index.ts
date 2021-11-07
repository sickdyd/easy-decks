// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { decksGetHandler } from '@src/api-handlers/decks/get'
import { decksPostHandler } from '@src/api-handlers/decks/post'
import prisma from '@src/prisma/prismaClient'
import { DeckWithCards } from '@src/types/deck'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeckWithCards[] | string>
) {
  if (req.method === 'GET') {
    await decksGetHandler({ req, res, prisma })
  } else if (req.method === 'POST') {
    await decksPostHandler({ req, res, prisma })
  } else {
    res.status(404).send('Invalid request method.')
  }
}
