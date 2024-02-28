import { useProtected } from '../../hooks/auth'

export default function Protected({ children }) {
  useProtected()

  return <div>{children}</div>
}
