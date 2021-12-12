import styled from '@emotion/styled'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
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

  .boat-deck-icon {
    width: 40px;
    height: 40px;
  }
`

const LogoName = styled.a`
  font-weight: 700;
  font-size: 1.5rem;
`

export function Navbar() {
  return (
    <Wrapper>
      <TopSection>
        <Link href="/" passHref>
          <LogoName>Easy Decks</LogoName>
        </Link>
        <Link href="/add-deck" passHref>
          <FontAwesomeIcon icon={faPlusCircle} size="2x" />
        </Link>
      </TopSection>
    </Wrapper>
  )
}
