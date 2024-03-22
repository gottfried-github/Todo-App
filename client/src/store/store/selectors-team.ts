import { type State } from './store'

export default {
  selectMembers: (state: State) => state.teams.members,
  selectFreeUsers: (state: State) => state.teams.freeUsers,
  selectData: (state: State) => state.teams.data,
  selectError: (state: State) => state.teams.error,
}
