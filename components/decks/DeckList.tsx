import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { DeckCover } from '@src/components/decks/DeckCover'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 2rem;
  column-gap: 2rem;
`

export function DeckList({ decks }: { decks: Deck[] }) {
  return (
    <Wrapper>
      {decks.map((deck) => (
        <DeckCover key={deck.id} deck={deck} />
      ))}
    </Wrapper>
  )
}
