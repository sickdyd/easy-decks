export async function decksDeleteHandler({ req, res, prisma }: RequestHandler) {
  const deckId = parseInt(req.query.id)

  // await prisma.deck.delete({ where: { id: deckId } })

  res.status(200).send('OK')
}
