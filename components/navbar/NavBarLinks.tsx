import styled from '@emotion/styled'
import { Container } from '@src/components/shared/Container'
import Link from 'next/link'

const NavbarLinks = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--star-command-blue);
  z-index: 10;
  width: 100vw;
  height: 100vh;
`

const LinkWrapper = styled.a`
  margin: 0.5rem;
  font-size: 2rem;
`

export function NavBarLinks({ setVisible }: { setVisible: Function }): JSX.Element {
  return (
    <NavbarLinks onClick={() => setVisible(false)}>
      <Link href="/add-deck" passHref>
        <LinkWrapper>Add Deck</LinkWrapper>
      </Link>
    </NavbarLinks>
  )
}
