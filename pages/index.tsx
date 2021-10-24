import type { NextPage } from 'next'
import Head from 'next/head'
import { MouseEvent, useEffect, useState } from 'react'
import styles from '@src/styles/Home.module.css'
import { Card } from '@src/components/Card'

const data = [
  {
    id: 0,
    front: ['学生'],
    back: ['がくせい'],
    flipped: false,
    chances: 50
  },
  {
    id: 1,
    front: ['先生'],
    back: ['せんせい'],
    flipped: false,
    chances: 50
  }
]

const Home: NextPage = () => {
  const [deck, setDeck] = useState<IDeck>(data)
  const [cardIndex, setCardIndex] = useState<number>(0)

  useEffect(() => {}, [deck])

  const chancesToRemove = (card: ICard) => 100 / deck.length / 10

  const redistribuiteChances = ({
    currentCardId,
    toRemove,
    deck
  }: {
    currentCardId: any
    toRemove: number
    deck: IDeck
  }) => {
    const amountForEachCard = toRemove / (deck.length - 1)
    const newDeckState: IDeck = deck.map((card) => ({
      ...card,
      chances: card.id !== currentCardId ? card.chances + amountForEachCard : card.chances
    }))

    return newDeckState
  }

  const handleOnClick = ({ event, success }: { event: MouseEvent; success?: boolean }) => {
    if (deck[cardIndex].flipped) {
      setCardIndex((previousIndex) => (previousIndex >= deck.length - 1 ? 0 : previousIndex + 1))

      let newDeckState: IDeck = Array.from(deck)
      newDeckState[cardIndex].flipped = false

      if (success) {
        const toRemove = chancesToRemove(newDeckState[cardIndex])
        newDeckState[cardIndex].chances -= toRemove
        newDeckState = redistribuiteChances({
          currentCardId: deck[cardIndex].id,
          toRemove,
          deck: newDeckState
        })
      }

      setDeck(newDeckState)
    } else {
      const newDeckState = Array.from(deck)

      newDeckState[cardIndex].flipped = true

      setDeck(newDeckState)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Easy Decks</title>
        <meta name="description" content="Easily practice your decks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Card {...deck[cardIndex]} handleOnClick={handleOnClick} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
