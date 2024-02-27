import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    unsetToken: state => {
      state.token = ''
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    unsetError: state => {
      state.error = null
    },
  },
  selectors: {
    selectToken: state => state.token,
    selectError: state => state.error,
  },
})

export default slice
