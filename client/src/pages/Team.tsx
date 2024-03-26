import { useAppSelector } from '../hooks/react-redux'
import selectorsAuth from '../store/store/selectors-auth'

import CreateTeam from '../components/team/CreateTeam'
import Team from '../components/team/Team'

export default function TeamPage() {
  const user = useAppSelector(state => selectorsAuth.selectUserData(state))

  if (!user) return null

  return user.teamId ? <Team /> : <CreateTeam />
}
