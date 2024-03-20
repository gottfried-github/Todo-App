import { handleActions } from 'redux-actions'

import { types } from '../actions/store/auth'

const reducer = handleActions(
  {
    [types.setToken]: (state, { payload }) => {
      return { ...state, token: payload }
    },
    [types.unsetToken]: state => {
      return { ...state, token: '' }
    },
    [types.setError]: (state, { payload }) => {
      return { ...state, error: payload }
    },
    [types.unsetError]: state => {
      return { ...state, error: null }
    },
    [types.setErrorSignup]: (state, { payload }) => {
      return { ...state, errorSignup: payload }
    },
    [types.unsetErrorSignup]: state => {
      return { ...state, errorSignup: null }
    },
    [types.setErrorSignin]: (state, { payload }) => {
      return { ...state, errorSignin: payload }
    },
    [types.unsetErrorSignin]: state => {
      return { ...state, errorSignin: null }
    },
    [types.setIsLoading]: (state, { payload }) => {
      return { ...state, isLoading: payload }
    },
    [types.setUserData]: (state, { payload }) => {
      return { ...state, userData: payload }
    },
    [types.setHasSocketConnected]: state => {
      return { ...state, hasSocketConnected: true }
    },
    [types.unsetHasSocketConnected]: state => {
      return { ...state, hasSocketConnected: null }
    },
    [types.setErrorSocket]: (state, { payload }) => {
      return { ...state, errorSocket: payload }
    },
    [types.unsetErrorSocket]: state => {
      return { ...state, errorSocket: null }
    },
  },
  {
    token: '',
    error: null,
    errorSignup: null,
    errorSignin: null,
    isLoading: true,
    userData: null,
    hasSocketConnected: null,
    errorSocket: null,
  }
)

export const selectors = {
  selectToken: state => state.auth.token,
  selectError: state => state.auth.error,
  selectErrorSignup: state => state.auth.errorSignup,
  selectErrorSignin: state => state.auth.errorSignin,
  selectIsLoading: state => state.auth.isLoading,
  selectUserData: state => state.auth.userData,
}

export default reducer
