import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { MouseEvent } from 'react'

export interface IStyledCard extends ICard {
  handleOnClick: ({ event, success }: { event: MouseEvent; success?: boolean }) => void
}

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

export function Card({ flipped, back, front, handleOnClick }: IStyledCard): JSX.Element {
  if (!flipped) {
    return (
      <Wrapper onClick={(event) => handleOnClick({ event })}>
        <Front>{front}</Front>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Back>{back}</Back>
      <IconsWrapper>
        <FontAwesomeIcon
          icon={faTimesCircle}
          color="red"
          onClick={(event) => handleOnClick({ event, success: false })}
        />
        <FontAwesomeIcon
          icon={faCheckCircle}
          color="green"
          onClick={(event) => handleOnClick({ event, success: true })}
        />
      </IconsWrapper>
    </Wrapper>
  )
}
