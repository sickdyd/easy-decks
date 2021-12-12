import styled from '@emotion/styled'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@src/components/shared/Button'
import { useAppDispatch, useAppSelector } from '@src/redux/hooks'
import { flipCard, initializeDeck, patchCard } from '@src/redux/slices/deckSlice'
import { useEffect } from 'react'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 70% 1fr;
  grid-template-rows: 1fr;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-family: 'M PLUS Rounded 1c';
  text-align: center;
`

const Front = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 7rem;
`

const FrontText = styled.div`
  font-size: 5rem;
`

const Guess = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  writing-mode: vertical-lr;
  text-orientation: upright;
  color: white;
  font-size: 2rem;
`

const WrongGuess = styled(Guess)`
  background-color: rgba(150, 0, 0, 0.9);
`

const RightGuess = styled(Guess)`
  background-color: rgba(0, 150, 0, 0.9);
`

const DeckCompleted = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100%;
  font-size: 2rem;
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
    dispatch(patchCard({ success: false, card: deck.cards[cardIndex] }))
  }

  const handleCorrectAnswer = () => {
    dispatch(patchCard({ success: true, card: deck.cards[cardIndex] }))
  }

  const handleStartAgain = () => {
    dispatch(initializeDeck(deck))
  }

  if (deckIsCompleted) {
    return (
      <DeckCompleted>
        You completed the deck! <Button onClick={handleStartAgain}>Start again</Button>
      </DeckCompleted>
    )
  }

  if (!flipped) {
    return <Front onClick={handleFlipCard}>{front}</Front>
  }

  return (
    <>
      <Wrapper>
        <WrongGuess onClick={handleWrongAnswer}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </WrongGuess>

        {flipped && (
          <CardContainer>
            <FrontText>{front}</FrontText>
            {back.map((element, index) => (
              <span key={index}>{element}</span>
            ))}
          </CardContainer>
        )}

        <RightGuess onClick={handleCorrectAnswer}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </RightGuess>
      </Wrapper>
      <div>{JSON.stringify(deck)}</div>
    </>
  )
}
