import styled from '@emotion/styled'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SpinnerIcon = styled(FontAwesomeIcon)`
  animation-name: rotate;
  animation-duration: 900ms;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  overflow: hidden;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export function Spinner(): JSX.Element {
  return <SpinnerIcon icon={faSpinner} />
}
