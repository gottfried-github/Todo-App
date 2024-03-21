export default {
  selectMembers: state => state.teams.members,
  selectFreeUsers: state => state.teams.freeUsers,
  selectData: state => state.teams.data,
  selectError: state => state.teams.error,
}
