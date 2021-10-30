import styled from '@emotion/styled'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import { Container } from '../shared/Container'

const Wrapper = styled(Container)`
  position: sticky;
  top: 0;
  background-color: var(--star-command-blue);
  color: var(--white);
  z-index: 10;
`

const TopSection = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

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

const Hamburger = styled(FontAwesomeIcon)`
  align-self: flex-end;
`

const LogoName = styled.a`
  font-weight: 700;
  font-size: 1.25rem;
`

const LinkWrapper = styled.a`
  margin: 0.5rem;
  font-size: 2rem;
`

export function Navbar() {
  const [visible, setVisible] = useState(false)

  return (
    <Wrapper>
      <TopSection>
        <Link href="/" passHref>
          <LogoName>Easy Decks</LogoName>
        </Link>
        <Hamburger onClick={() => setVisible((prev) => !prev)} icon={faHamburger} size="2x" />
      </TopSection>

      {visible && (
        <NavbarLinks onClick={() => setVisible(false)}>
          <Link href="/add-deck" passHref>
            <LinkWrapper>Add Deck</LinkWrapper>
          </Link>
        </NavbarLinks>
      )}
    </Wrapper>
  )
}
