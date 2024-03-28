import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import type { ErrorPayload, UserData } from '../types/common'
import type {
  StateToken,
  StateError,
  StateErrorSocket,
  StateUserData,
  StorePayloadErrorSocket,
} from '../types/auth'

import { types } from '../actions/auth'

const token = handleActions(
  {
    [types.storeSetToken]: (state: StateToken, { payload }: { payload: StateToken }) => {
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
    [types.storeSetError]: (state: StateError, { payload }: { payload: ErrorPayload }) => {
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
    [types.storeSetErrorSignup]: (state: StateError, { payload }: { payload: ErrorPayload }) => {
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
    [types.storeSetErrorSignin]: (state: StateError, { payload }: { payload: ErrorPayload }) => {
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
    [types.storeSetErrorSocket]: (
      state: StateErrorSocket,
      { payload }: { payload: StorePayloadErrorSocket }
    ) => {
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
  (state: StateUserData, { payload }: { payload: UserData }) => {
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
