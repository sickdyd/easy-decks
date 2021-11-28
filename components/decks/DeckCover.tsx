import { Deck } from '.prisma/client'
import styled from '@emotion/styled'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@src/components/shared/Button'
import axios from '@src/requests/axiosInterceptors'
import Link from 'next/link'
import React, { MouseEvent, useRef, useState } from 'react'

const Wrapper = styled.div`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 14px rgba(0, 0, 0, 1) inset;
  width: 150px;
  height: 150px;
  background-image: url('/assets/wood-dark.png');
  background-size: contain;

  .reduced {
    width: 40px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .rotated-180 {
    transform: rotate(180deg);
  }

  .rotated-90 {
    position: absolute;
    top: 2.75rem;
    left: 2.25rem;
    transform: rotate(90deg);
    transform-origin: top left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const Cover = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 1rem;
  background-image: url('/assets/wood-clear.png');
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 200ms;
  border-radius: 10px;
  z-index: 9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

const Inside = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 40px;
`

const ShowInsideIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  color: var(--star-command-blue);
  font-size: 1.5em;
  transition: all 600ms;
`

const DeckNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms;
`

export function DeckCover({ deck }: { deck: Deck }) {
  const [loading, setLoading] = useState(false)
  const [showInside, setShowInside] = useState(false)
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
        setShowInside(false)
      })
  }

  return (
    <Wrapper>
      <Cover className={showInside ? 'reduced' : ''} ref={infoPanelRef}>
        <DeckNameWrapper className={showInside ? 'rotated-90' : ''}>
          <Link href={`/play-deck/${deck.id}`} passHref>
            <Button>{deck.name}</Button>
          </Link>
        </DeckNameWrapper>
        <ShowInsideIcon
          className={showInside ? 'rotated-180' : ''}
          onClick={() => setShowInside((prev) => !prev)}
          icon={faChevronCircleLeft}
        />
      </Cover>
      <Inside>
        <Button variant="danger" loading={loading} onClick={handleDelete}>
          Delete
        </Button>
      </Inside>
    </Wrapper>
  )
}
