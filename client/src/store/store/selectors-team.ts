import { type RootState } from './store'

export default {
  selectMembers: (state: RootState) => state.teams.members,
  selectFreeUsers: (state: RootState) => state.teams.freeUsers,
  selectData: (state: RootState) => state.teams.data,
  selectError: (state: RootState) => state.teams.error,
}
