import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'teams',
  initialState: {
    members: [],
    data: null,
    error: null,
  },
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  selectors: {
    selectMembers: state => state.members,
    selectData: state => state.data,
    selectError: state => state.error,
  },
})

export default slice
