import { Prisma } from '@prisma/client'

const card = Prisma.validator<Prisma.CardArgs>()({})

export type Card = Prisma.CardGetPayload<typeof card> & { viewed: Boolean; flipped: Boolean }
