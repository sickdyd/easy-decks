import styled from '@emotion/styled'
import NextImage, { ImageProps } from 'next/image'

const Wrapper = styled.div``

export function Image({ className, ...props }: ImageProps): JSX.Element {
  return (
    <Wrapper className={className}>
      <NextImage {...props} />
    </Wrapper>
  )
}
