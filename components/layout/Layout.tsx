import { ReactNode } from 'react'
import { Navbar } from '../navbar/Navbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
