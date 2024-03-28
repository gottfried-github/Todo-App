import { combineReducers } from 'redux'
import { type Action, handleAction, handleActions } from 'redux-actions'

import type { ErrorPayload, UserData } from '../types/common'
import type { StateToken, StateUserData, StorePayloadErrorSocket } from '../types/auth'

import { types } from '../actions/auth'

const token = handleActions(
  {
    [types.storeSetToken]: (state, { payload }: Action<StateToken>) => {
      return payload
    },
    [types.storeUnsetToken]: () => {
      return ''
    },
  },
  ''
)

const errorAuth = handleActions(
  {
    [types.storeSetError]: (state, { payload }: Action<ErrorPayload>) => {
      return payload
    },
    [types.storeUnsetError]: () => {
      return null
    },
  },
  null
)

const errorSignup = handleActions(
  {
    [types.storeSetErrorSignup]: (state, { payload }: Action<ErrorPayload>) => {
      return payload
    },
    [types.storeUnsetErrorSignup]: () => {
      return null
    },
  },
  null
)

const errorSignin = handleActions(
  {
    [types.storeSetErrorSignin]: (state, { payload }: Action<ErrorPayload>) => {
      return payload
    },
    [types.storeUnsetErrorSignin]: () => {
      return null
    },
  },
  null
)

const errorSocket = handleActions(
  {
    [types.storeSetErrorSocket]: (state, { payload }: Action<StorePayloadErrorSocket>) => {
      return payload
    },
    [types.storeUnsetErrorSocket]: () => {
      return null
    },
  },
  null
)

const isLoading = handleActions(
  {
    [types.storeSetIsLoading]: () => {
      return true
    },
    [types.storeUnsetIsLoading]: () => {
      return false
    },
  },
  true
)

const userData = handleAction(
  types.storeSetUserData,
  (state: StateUserData, { payload }: Action<UserData>) => {
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
