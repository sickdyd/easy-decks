import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { Button } from '@src/components/shared/Button'
import axios from '@src/requests/axiosInterceptors'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { MouseEvent, useState } from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  padding: 2rem;
  width: calc((100% - 1rem) / 2);
  box-size: auto;
  aspect-ratio: 1;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  gap: 1rem;

  @media (orientation: landscape) {
    width: calc((100% - 3rem) / 4);
  }
`

export function DeckCover({ deck }: { deck: Deck }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation()
    setLoading(true)

    axios
      .delete(`/api/decks/${deck.id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
        router.push('/')
      })
  }

  return (
    <Wrapper>
      <Link href={`/play-deck/${deck.id}`} passHref>
        <Button>{deck.name}</Button>
      </Link>
      <Button variant="danger" loading={loading} onClick={handleDelete}>
        Delete
      </Button>
    </Wrapper>
  )
}
