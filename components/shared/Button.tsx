import styled from '@emotion/styled'
import { Spinner } from '@src/components/shared/Spinner'
import React, { ReactNode } from 'react'

const BaseButton = styled.button<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 200ms;
  flex-wrap: nowrap;
  white-space: nowrap;
  color: white;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
const StyledSpinner = styled(Spinner)`
  margin-left: 1rem;
  border: 1px solid blue;
`

type ButtonVariant = 'danger' | 'warning' | 'confirm'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({
  loading = false,
  variant = 'confirm',
  children,
  ...props
}: ButtonProps): JSX.Element {
  let backgroundColor = ''

  switch (variant) {
    case 'warning':
      backgroundColor = 'var(--amber)'
      break
    case 'danger':
      backgroundColor = 'var(--paradise-pink)'
      break
    default:
      backgroundColor = 'var(--illuminating-emerald)'
  }

  return (
    <BaseButton {...props} backgroundColor={backgroundColor}>
      {children}&nbsp;{loading && <StyledSpinner />}
    </BaseButton>
  )
}
