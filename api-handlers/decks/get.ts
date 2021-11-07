export async function decksGetHandler({ res, prisma }: RequestHandler) {
  const decks = await prisma.deck.findMany()

  res.status(200).send(JSON.stringify(decks))
}
