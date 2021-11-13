import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import Link from 'next/link'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 1rem;
  column-gap: 1rem;
`

const DeckCover = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100px;
  background-color: var(--white);
  color: var(--paradise-pink);
  font-size: 0.85rem;
  padding: 1rem;
  border-radius: 10px;
  border: 4px dashed var(--paradise-pink);
  text-align: center;
`

export function DeckList({ decks }: { decks: Deck[] }) {
  return (
    <Wrapper>
      {decks.map((deck, index) => (
        <Link key={index} href={`/play-deck/${deck.id}`} passHref>
          <DeckCover>{deck.name}</DeckCover>
        </Link>
      ))}
    </Wrapper>
  )
}
