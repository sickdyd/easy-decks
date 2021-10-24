import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@src/redux/hooks'
import { flipCard, changeCard, adjustCardsChancesToShow } from '@src/redux/slices/deckSlice'

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
  const deck = useAppSelector((state) => state.deck)
  const cardIndex = useAppSelector((state) => state.deck.cardIndex)
  const { flipped, front, back } = deck.cards[cardIndex]

  const dispatch = useAppDispatch()

  const handleFlipCard = () => {
    dispatch(flipCard(cardIndex))
  }

  const handleWrongAnswer = () => {
    dispatch(changeCard())
  }

  const handleCorrectAnswer = () => {
    dispatch(adjustCardsChancesToShow(cardIndex))
    dispatch(changeCard())
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
