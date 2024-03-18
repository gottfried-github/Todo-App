import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'teams',
  initialState: {
    members: [],
    freeUsers: [],
    data: null,
    error: null,
  },
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload
    },
    setFreeUsers: (state, action) => {
      state.freeUsers = action.payload
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
    selectFreeUsers: state => state.freeUsers,
    selectData: state => state.data,
    selectError: state => state.error,
  },
})

export default slice
