import { useProtected } from '../../hooks/auth'

export default function Protected({ children }) {
  const accessGranted = useProtected()

  return <>{accessGranted ? children : null}</>
}
