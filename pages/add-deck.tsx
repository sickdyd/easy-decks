import styled from '@emotion/styled'
import { Button } from '@src/components/shared/Button'
import { Container } from '@src/components/shared/Container'
import { Paragraph } from '@src/components/shared/Paragraph'
import { TextInput } from '@src/components/shared/TextInput'
import { useFileInput } from '@src/hooks/useFileInput'
import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

export const Wrapper = styled(Container)`
  padding-top: 2rem;
`

const ContentPreview = styled.pre`
  margin-top: 1rem;
`

const UploadButton = styled(Button)`
  margin-top: 1rem;
`

const StyledTextInput = styled(TextInput)`
  margin-top: 1rem;
`

const Row = styled.div``

const AddDeck: NextPage = () => {
  const [data, setData] = useState<string[] | undefined>()
  const [deckName, setDeckName] = useState<string>()
  const { FileInput } = useFileInput({ onFileChange, accept: 'csv' })

  const uploadDeck = async () => {
    // TODO: handle post request
  }

  function onFileChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList
    const reader = new FileReader()

    reader.readAsText(files[0])

    reader.onload = ({ target }) => {
      const csv = target?.result as string
      const rows = csv?.split('\n')

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
      {data && deckName && <UploadButton onClick={uploadDeck}>Upload Deck!</UploadButton>}
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
