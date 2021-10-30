import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 3px solid red;
  border-radius: 10px;
  width: 250px;
  height: 350px;
`

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 6rem;
  margin-top: 4rem;
`
