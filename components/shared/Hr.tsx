import styled from '@emotion/styled'

export const Hr = styled.div<{ color?: string }>`
  border: 1px solid ${({ color }) => (color ? color : 'rgba(150, 150, 150, 0.2)')};
  width: 100%;
`
