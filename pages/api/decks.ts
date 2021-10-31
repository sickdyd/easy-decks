// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse<IDeck[] | string>) {
  try {
    console.log(req.body)

    const prisma = new PrismaClient()

    const { name, cards } = JSON.parse(req.body) as IDeck

    const deck = await prisma.deck.create({ data: { name } })

    cards.forEach(async (card) => {
      await prisma.card.create({ data: { ...card, deckId: deck.id } })
    })

    await prisma.$disconnect()

    res.status(200).send('OK')
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error while processing the request.')
  }
}
