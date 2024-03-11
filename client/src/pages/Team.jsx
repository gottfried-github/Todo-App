import { useSelector } from 'react-redux'
import sliceAuth from '../store/store/slice-auth'

import CreateTeam from '../components/team/CreateTeam'
import Team from '../components/team/Team'

export default function TeamPage() {
  const user = useSelector(state => sliceAuth.selectors.selectUserData(state))

  return user.teamId ? <Team /> : <CreateTeam />
}
