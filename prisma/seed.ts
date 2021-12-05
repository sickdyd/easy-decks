import { PrismaClient } from '.prisma/client'
import faker from 'faker'

const prisma = new PrismaClient()

async function main() {
  if (process.env.NODE_ENV === 'production') {
    console.log('⚠️   Record deletion and seed aborted for production environment.')
    return
  }

  prisma.card.deleteMany()
  prisma.deck.deleteMany()

  const cards = [...new Array(10)].map(() => ({
    front: faker.vehicle.model(),
    back: faker.vehicle.manufacturer(),
    viewed: false,
    flipped: false,
    chances: 5
  }))

  await prisma.deck.create({
    data: {
      name: faker.name.title(),
      cardIndex: 0,
      lastCardIndex: 0,
      lastCardIndexes: [],
      deckIsCompleted: false,
      cards: {
        create: cards
      }
    }
  })
}

main()
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
  .finally(async () => {
    prisma.$disconnect()
  })
