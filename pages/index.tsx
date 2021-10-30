import type { NextPage } from 'next'
import Head from 'next/head'
import { Card } from '@src/components/card/Card'
import { Wrapper } from '@src/components/pages/index/IndexStyles'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Easy Decks</title>
        <meta name="description" content="Easily practice your decks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card />
      </main>

      <footer></footer>
    </Wrapper>
  )
}

export default Home
