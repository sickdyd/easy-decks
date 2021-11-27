import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { Button } from '@src/components/shared/Button'
import { Spinner } from '@src/components/shared/Spinner'
import axios from '@src/requests/axiosInterceptors'
import Link from 'next/link'
import React, { MouseEvent, useRef, useState } from 'react'

const Wrapper = styled.div`
  position: relative;

  .expanded {
    width: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    * {
      display: block;
    }
  }
`

const Cover = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
  z-index: 0;
  padding-left: 40px;
`

const InfoPanel = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  left: 0;
  height: 100%;
  width: 40px;
  padding: 1rem;
  background-color: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 200ms;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  z-index: 9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  * {
    display: none;
    border: 1px solid transparent;
  }
`

export function DeckCover({ deck }: { deck: Deck }) {
  const [loading, setLoading] = useState(false)
  const [infoExpanded, setInfoExpanded] = useState(false)
  const infoPanelRef = useRef<HTMLDivElement>(null)

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation()
    setLoading(true)

    axios
      .delete(`/api/decks/${deck.id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
        setInfoExpanded(false)
      })
  }

  return (
    <Wrapper>
      <InfoPanel
        onClick={() => setInfoExpanded((prev) => !prev)}
        className={infoExpanded ? 'expanded' : ''}
        ref={infoPanelRef}
      >
        <Button onClick={handleDelete} disabled={!infoExpanded || loading}>
          Delete {loading && <Spinner />}
        </Button>
      </InfoPanel>
      <Link href={`/play-deck/${deck.id}`} passHref>
        <Cover>{deck.name}</Cover>
      </Link>
    </Wrapper>
  )
}
