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
  height: 150px;
  width: 150px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
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
