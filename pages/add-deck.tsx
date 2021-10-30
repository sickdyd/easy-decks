import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { Container } from '@src/components/shared/Container'
import { ChangeEvent } from 'react'

export const Wrapper = styled(Container)`
  border: 1px solid red;
`

const AddDeck: NextPage = () => {
  const onFileChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList
    const reader = new FileReader()

    reader.readAsText(files[0])

    reader.onload = (event) => {
      console.log(event?.target?.result)
    }
  }

  return (
    <Wrapper>
      <input type="file" accept=".csv" onChange={onFileChange} />
    </Wrapper>
  )
}

export default AddDeck
