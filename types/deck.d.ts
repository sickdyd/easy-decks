import { Prisma } from '@prisma/client'

const deckWithCards = Prisma.validator<Prisma.DeckArgs>()({
  include: { cards: true }
})

type DeckWithCards = Prisma.DeckGetPayload<typeof deckWithCards>
