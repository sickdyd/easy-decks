import styled from '@emotion/styled'

export const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--amber);
  border-radius: 5px;
  transition: all 200ms;
  flex-wrap: nowrap;
  white-space: nowrap;

  &:hover {
    background-color: var(--paradise-pink);
    color: var(--white);
    cursor: pointer;
  }
`
