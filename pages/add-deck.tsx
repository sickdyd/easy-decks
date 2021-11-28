import styled from '@emotion/styled'
import { Button } from '@src/components/shared/Button'
import { Container } from '@src/components/shared/Container'
import { Paragraph } from '@src/components/shared/Paragraph'
import { TextInput } from '@src/components/shared/TextInput'
import { useFileInput } from '@src/hooks/useFileInput'
import axios from '@src/requests/axiosInterceptors'
import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

const Wrapper = styled(Container)`
  padding-top: 2rem;
`

const ContentPreview = styled.pre`
  margin-top: 1rem;
  overflow: hidden;
  max-width: 90vw;
`

const UploadButton = styled(Button)`
  margin-top: 1rem;
`

const StyledTextInput = styled(TextInput)`
  margin-top: 1rem;
`

const Row = styled.div``

const buildCardBack = ({ headers, columns }: { headers: string[]; columns: string[] }) => {
  const cardHeaders = headers.slice(1, headers.length)
  const cardColumns = columns.slice(1, columns.length)

  return cardHeaders.map((header, index) => `${header}: ${cardColumns[index]}`)
}

const buildCards = ({ data }: { data: string[] }) => {
  const headers = data[0].split(',')
  const cardRows = data.slice(1, data.length)

  const cards = cardRows.map((row) => {
    const columns = row.split(',')
    return {
      front: [columns[0]],
      back: buildCardBack({ headers, columns }),
      flipped: false,
      chances: 100
    }
  })

  return cards
}

const AddDeck: NextPage = () => {
  const [data, setData] = useState<string[] | undefined>()
  const [deckName, setDeckName] = useState<string>()
  const { FileInput } = useFileInput({ onFileChange, accept: 'csv' })

  const uploadDeck = async () => {
    data &&
      axios
        .post('/api/decks', { name: deckName, cards: buildCards({ data }) })
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
  }

  function onFileChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList
    const reader = new FileReader()

    reader.readAsText(files[0])

    reader.onload = ({ target }) => {
      const csv = target?.result as string
      const rows = csv?.split('\r\n')

      setData(rows)
    }
  }

  return (
    <Wrapper>
      <Paragraph>
        Select a CSV file and upload your deck! The first column of the CSV will be the front of the
        card.
      </Paragraph>
      <FileInput />
      {data && (
        <StyledTextInput
          onChange={({ target }) => setDeckName(target.value)}
          placeholder="Type a deck name"
        />
      )}
      {data && deckName && (
        <UploadButton variant="confirm" onClick={uploadDeck}>
          Upload Deck!
        </UploadButton>
      )}
      {data && (
        <ContentPreview>
          {data?.map((row) => (
            <Row key={row}>{row}</Row>
          ))}
        </ContentPreview>
      )}
    </Wrapper>
  )
}

export default AddDeck
