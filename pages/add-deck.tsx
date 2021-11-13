import styled from '@emotion/styled'
import { Button } from '@src/components/shared/Button'
import { Container } from '@src/components/shared/Container'
import { useFileInput } from '@src/hooks/useFileInput'
import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

export const Wrapper = styled(Container)``

const ContentPreview = styled.pre``

const Row = styled.div``

const UploadButton = styled(Button)``

const AddDeck: NextPage = () => {
  const [data, setData] = useState<string[] | undefined>()
  const { FileInput } = useFileInput({ onFileChange, accept: 'csv' })

  const saveDeck = async () => {
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
      <FileInput />
      <ContentPreview>
        {data?.map((row) => (
          <Row key={row}>{row}</Row>
        ))}
      </ContentPreview>
      {data && <UploadButton>Upload Deck!</UploadButton>}
    </Wrapper>
  )
}

export default AddDeck
