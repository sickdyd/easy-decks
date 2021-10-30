import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@src/redux/hooks'
import { flipCard, guessCard, initializeDeck } from '@src/redux/slices/deckSlice'
import { useEffect } from 'react'
import { dummyDeck } from '@src/decks/dummyDeck'
import { CardContainer, IconsWrapper, Wrapper } from './CardStyles'

export function Card(): JSX.Element {
  const dispatch = useAppDispatch()
  const deck = useAppSelector((state) => state.deck)
  const cardIndex = useAppSelector((state) => state.deck.cardIndex)
  const deckIsCompleted = useAppSelector((state) => state.deck.deckIsCompleted)

  const { flipped, front, back } = deck.cards[cardIndex] || {}

  useEffect(() => {
    dispatch(initializeDeck(dummyDeck))
  }, [])

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
        <CardContainer>{front}</CardContainer>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <CardContainer>{back}</CardContainer>
      <IconsWrapper>
        <FontAwesomeIcon icon={faTimesCircle} color="red" onClick={handleWrongAnswer} />
        <FontAwesomeIcon icon={faCheckCircle} color="green" onClick={handleCorrectAnswer} />
      </IconsWrapper>
    </Wrapper>
  )
}
