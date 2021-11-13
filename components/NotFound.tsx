import styled from '@emotion/styled'
import { Button } from '@src/components/shared/Button'
import Link from 'next/link'
import { ReactNode } from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const Header = styled.h2``

const Message = styled.p``

const HomeButton = styled(Button.withComponent('a'))``

export function NotFound({
  message,
  buttonLabel,
  buttonUrl
}: {
  message: ReactNode
  buttonLabel: string
  buttonUrl: string
}): JSX.Element {
  return (
    <Wrapper>
      <Header>Not Found</Header>
      <Message>{message}</Message>
      <Link href={buttonUrl} passHref>
        <HomeButton>{buttonLabel}</HomeButton>
      </Link>
    </Wrapper>
  )
}
