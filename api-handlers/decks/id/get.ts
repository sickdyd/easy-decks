export async function deckGetHandler({ res, prisma, id }: RequestHandler) {
  const deck = await prisma.deck.findUnique({ where: { id }, include: { cards: true } })

  if (deck) {
    res.status(200).send(JSON.stringify(deck))
  } else {
    res.status(404).send('Not found')
  }
}
