import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Spinner(): JSX.Element {
  return <FontAwesomeIcon icon={faSpinner} spin />
}
