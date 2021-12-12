import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { DeckCover } from '@src/components/decks/DeckCover'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
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
