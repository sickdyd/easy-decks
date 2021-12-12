import { Prisma } from '@prisma/client'
import { Card } from '@src/types/card'

const deckWithCards = Prisma.validator<Prisma.DeckArgs>()({})

type DeckWithCards = Prisma.DeckGetPayload<typeof deckWithCards> & {
  deckIsCompleted: boolean
  cardIndex: number
  cards: Card[]
}
