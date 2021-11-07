// Added to prevent creating multiple Prisma clients while using hot-reload.
// i.e. warn(prisma-client) Already 10 Prisma Clients are actively running.
// https://github.com/prisma/prisma/issues/1983#issuecomment-869036852

import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default prisma
