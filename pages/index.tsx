import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@src/styles/Home.module.css'
import { Card } from '@src/components/Card'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Easy Decks</title>
        <meta name="description" content="Easily practice your decks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Card />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
