import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'teams',
  initialState: {
    members: [],
    users: [],
    data: null,
    error: null,
  },
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    appendMember: (state, action) => {
      state.members.push(action.payload)
    },
    deleteMember: (state, action) => {
      state.members = state.members.filter(member => member.id !== action.payload.id)
    },
  },
  selectors: {
    selectMembers: state => state.members,
    selectUsers: state => state.users,
    selectData: state => state.data,
    selectError: state => state.error,
  },
})

export default slice
