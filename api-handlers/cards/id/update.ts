export async function cardUpdateHandler({ req, res, prisma, id }: RequestHandler) {
  try {
    const updatedCard = await prisma.card.update({
      where: { id },
      data: { ...req.body }
    })

    res.status(200).send(updatedCard)
  } catch (error) {
    res.status(500).send(error)
  }
}
