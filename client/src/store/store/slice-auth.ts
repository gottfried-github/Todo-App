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
  (state: null | object, { payload }: { payload: object }) => {
    return payload
  },
  null
)

export default combineReducers({
  token,
  errorAuth,
  errorSignup,
  errorSignin,
  errorSocket,
  isLoading,
  userData,
})
