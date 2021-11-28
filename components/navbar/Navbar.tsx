import styled from '@emotion/styled'
import { NavBarLinks } from '@src/components/navbar/NavBarLinks'
import { Image } from '@src/components/shared/Image'
import Link from 'next/link'
import { useState } from 'react'
import { Container } from '../shared/Container'

const Wrapper = styled(Container)`
  position: sticky;
  top: 0;
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
  font-size: 1.25rem;
`

export function Navbar() {
  const [visible, setVisible] = useState(false)

  return (
    <Wrapper>
      <TopSection>
        <Link href="/" passHref>
          <LogoName>Easy Decks</LogoName>
        </Link>
        <Image
          onClick={() => setVisible(true)}
          className="boat-deck-icon"
          src="/assets/boat.png"
          alt="Boat Deck Icon"
          layout="responsive"
          width={512}
          height={512}
        />
      </TopSection>

      {visible && <NavBarLinks setVisible={setVisible} />}
    </Wrapper>
  )
}
