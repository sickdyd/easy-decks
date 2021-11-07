interface RequestHandler {
  req: NextApiRequest
  res: NextApiResponse<DeckWithCards[] | string>
  prisma: PrismaClient
  id?: number
}
