import { ReactNode } from 'react'
import { Navbar } from '../navbar/Navbar'
import Head from 'next/head'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Easy Decks</title>
        <meta name="description" content="Easily practice your decks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {children}
      <footer></footer>
    </>
  )
}
