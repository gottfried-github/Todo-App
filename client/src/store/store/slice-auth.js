import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import { types } from '../actions/store/auth'

const token = handleActions(
  {
    [types.setToken]: (state, { payload }) => {
      return payload
    },
    [types.unsetToken]: () => {
      return ''
    },
  },
  ''
)

const errorAuth = handleActions(
  {
    [types.setError]: (state, { payload }) => {
      return payload
    },
    [types.unsetError]: () => {
      return null
    },
  },
  null
)

const errorSignup = handleActions(
  {
    [types.setErrorSignup]: (state, { payload }) => {
      return payload
    },
    [types.unsetErrorSignup]: () => {
      return null
    },
  },
  null
)

const errorSignin = handleActions(
  {
    [types.setErrorSignin]: (state, { payload }) => {
      return payload
    },
    [types.unsetErrorSignin]: () => {
      return null
    },
  },
  null
)

const errorSocket = handleActions(
  {
    [types.setErrorSocket]: (state, { payload }) => {
      return payload
    },
    [types.unsetErrorSocket]: () => {
      return null
    },
  },
  null
)

const isLoading = handleActions(
  {
    [types.setIsLoading]: () => {
      return true
    },
    [types.unsetIsLoading]: () => {
      return false
    },
  },
  true
)

const userData = handleAction(
  types.setUserData,
  (state, { payload }) => {
    return payload
  },
  null
)

export const selectors = {
  selectToken: state => state.auth.token,
  selectError: state => state.auth.error,
  selectErrorSignup: state => state.auth.errorSignup,
  selectErrorSignin: state => state.auth.errorSignin,
  selectIsLoading: state => state.auth.isLoading,
  selectUserData: state => state.auth.userData,
}

export default combineReducers({
  token,
  errorAuth,
  errorSignup,
  errorSignin,
  errorSocket,
  isLoading,
  userData,
})
