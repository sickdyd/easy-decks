import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@src/redux/hooks'
import { flipCard, guessCard, initializeDeck } from '@src/redux/slices/deckSlice'
import { useEffect } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: var(--paradise-pink);
  background-color: var(--white);
  border: 10px solid;
  padding: 2rem;

  &:hover {
    cursor: pointer;
  }
`

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: calc(10vw + 1rem);
  font-family: 'M PLUS Rounded 1c';
`

const Front = styled(CardContainer)`
  font-size: calc(10vw + 5rem);
`

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 4rem;
  margin-top: 2rem;
`

export function Deck(): JSX.Element {
  const dispatch = useAppDispatch()
  const deck = useAppSelector((state) => state.deck)
  const cardIndex = useAppSelector((state) => state.deck.cardIndex)
  const deckIsCompleted = useAppSelector((state) => state.deck.deckIsCompleted)

  const { flipped, front, back } = deck.cards[cardIndex] || {}

  useEffect(() => {
    handleStartAgain()
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
    dispatch(initializeDeck(deck))
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
      <Front onClick={handleFlipCard}>{front}</Front>
      {flipped && (
        <>
          <CardContainer>{back}</CardContainer>
          <IconsWrapper>
            <FontAwesomeIcon icon={faTimesCircle} color="red" onClick={handleWrongAnswer} />
            <FontAwesomeIcon icon={faCheckCircle} color="green" onClick={handleCorrectAnswer} />
          </IconsWrapper>
        </>
      )}
    </Wrapper>
  )
}
