import styled from '@emotion/styled'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@src/components/shared/Button'
import { ChangeEvent, createRef, ReactElement } from 'react'

interface FileInput {
  FileInput: () => ReactElement
}

interface FileInputParams {
  onFileChange: (event: ChangeEvent) => void
  accept?: string
  multiple?: boolean
  buttonLabel?: string
}

const StyledFileButton = styled(Button)`
  font-size: inherit;
`

const StyledFileInput = styled.input`
  display: none;
`

const ButtonLabel = styled.span`
  * {
    margin-left: 0.5rem;
  }
`

export function useFileInput({
  onFileChange,
  accept = '',
  multiple = true,
  buttonLabel = 'Select File'
}: FileInputParams): FileInput {
  const inputRef = createRef<HTMLInputElement>()

  const handleOnClick = () => {
    inputRef && inputRef?.current?.click()
  }

  return {
    FileInput: () => (
      <>
        <StyledFileButton onClick={handleOnClick}>
          <ButtonLabel>
            {buttonLabel}
            <FontAwesomeIcon style={{ fontSize: 'inherit' }} icon={faUpload} />
          </ButtonLabel>
        </StyledFileButton>
        <StyledFileInput
          ref={inputRef}
          accept={accept}
          type="file"
          multiple={multiple}
          onChange={onFileChange}
        />
      </>
    )
  }
}
