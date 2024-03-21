import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import { types } from '../actions/store/auth'
import {
  type Token,
  type ErrorPayload,
  type ErrorSocket as ErrorSocketPayload,
  type UserData as UserDataPayload,
} from '../actions/store/auth'

export type ErrorState = null | ErrorPayload
export type ErrorSocket = null | ErrorSocketPayload
export type UserData = null | UserDataPayload
export { type Token, type IsLoading } from '../actions/store/auth'

const token = handleActions(
  {
    [types.setToken]: (state: Token, { payload }: { payload: Token }) => {
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
    [types.setError]: (state: ErrorState, { payload }: { payload: ErrorPayload }) => {
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
    [types.setErrorSignup]: (state: ErrorState, { payload }: { payload: ErrorPayload }) => {
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
    [types.setErrorSignin]: (state: ErrorState, { payload }: { payload: ErrorPayload }) => {
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
    [types.setErrorSocket]: (state: ErrorSocket, { payload }: { payload: ErrorSocketPayload }) => {
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
  (state: UserData, { payload }: { payload: UserDataPayload }) => {
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
