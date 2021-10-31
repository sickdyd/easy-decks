import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { Container } from '@src/components/shared/Container'
import { ChangeEvent, useEffect, useState } from 'react'
import { dummyDecks } from '@src/decks/dummyDecks'

export const Wrapper = styled(Container)``

const parseCSV = (csv?: string) => {
  const rows = csv?.split('\n')
  const headers = rows?.[0].split(',')
  const data = rows?.slice(1, rows.length - 1)

  return {
    headers,
    data
  }
}

const AddDeck: NextPage = () => {
  const [headers, setHeaders] = useState<string[] | undefined>([])
  const [data, setData] = useState<string[] | undefined>([])
  const [decks, setDecks] = useState<IDecks[] | undefined>()

  useEffect(() => {
    const getDecks = () => {
      fetch('/api/decks')
        .then(async (response) => await response.json())
        .then((data) => {
          setDecks(data)
          console.log(data)
        })
    }

    getDecks()
  }, [])

  const saveDeck = async () => {
    fetch('/api/decks', {
      method: 'POST',
      body: JSON.stringify(dummyDecks[0])
    }).then((response) => console.log(response.status))
  }

  const onFileChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList
    const reader = new FileReader()

    reader.readAsText(files[0])

    reader.onload = ({ target }) => {
      const csv = target?.result as string
      const { headers, data } = parseCSV(csv)

      setHeaders(headers)
      setData(data)
    }
  }

  return (
    <Wrapper>
      <input type="file" accept=".csv" onChange={onFileChange} />
      <button onClick={saveDeck}>Save dummy deck</button>
    </Wrapper>
  )
}

export default AddDeck
