import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@src/redux/hooks'
import { flipCard, guessCard, initializeDeck } from '@src/redux/slices/deckSlice'
import { useEffect } from 'react'
import { dummyDeck } from '@src/decks/dummyDeck'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`

const Front = styled.div`
  text-align: center;
  font-size: 12rem;
`

const Back = styled.div`
  text-align: center;
  font-size: 5rem;
`

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 6rem;
  margin-top: 4rem;
`

export function Card(): JSX.Element {
  const dispatch = useAppDispatch()
  const deck = useAppSelector((state) => state.deck)
  const cardIndex = useAppSelector((state) => state.deck.cardIndex)
  const deckIsCompleted = useAppSelector((state) => state.deck.deckIsCompleted)

  const { flipped, front, back } = deck.cards[cardIndex] || {}

  useEffect(() => {
    console.table(deck.cards)
    console.table(deck.completedCards)
  }, [deck])

  const handleFlipCard = () => {
    dispatch(flipCard())
  }

  const handleWrongAnswer = () => {
    dispatch(guessCard(false))
  }

  const handleCorrectAnswer = () => {
    dispatch(guessCard(true))
  }

  const handleStartAgain = () => {
    dispatch(initializeDeck(dummyDeck))
  }

  if (deckIsCompleted) {
    return (
      <Wrapper>
        You completed the deck! <button onClick={handleStartAgain}>Start again!</button>
      </Wrapper>
    )
  }

  if (!flipped) {
    return (
      <Wrapper onClick={handleFlipCard}>
        <Front>{front}</Front>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Back>{back}</Back>
      <IconsWrapper>
        <FontAwesomeIcon icon={faTimesCircle} color="red" onClick={handleWrongAnswer} />
        <FontAwesomeIcon icon={faCheckCircle} color="green" onClick={handleCorrectAnswer} />
      </IconsWrapper>
    </Wrapper>
  )
}
