import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import { types } from '../actions/auth'
import { type UserData as UserDataPayload, type ErrorPayload } from '../types/common'
import { type StorePayloadToken, type StorePayloadErrorSocket } from '../types/auth'

type ErrorAuthPayload = ErrorPayload & {
  errors?: { [key: string]: { message?: string } }
}

type ErrorState = null | ErrorAuthPayload
type ErrorSocket = null | StorePayloadErrorSocket
type UserData = null | UserDataPayload

const token = handleActions(
  {
    [types.storeSetToken]: (
      state: StorePayloadToken,
      { payload }: { payload: StorePayloadToken }
    ) => {
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
    [types.storeSetError]: (state: ErrorState, { payload }: { payload: ErrorPayload }) => {
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
    [types.storeSetErrorSignup]: (state: ErrorState, { payload }: { payload: ErrorPayload }) => {
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
    [types.storeSetErrorSignin]: (state: ErrorState, { payload }: { payload: ErrorPayload }) => {
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
      state: ErrorSocket,
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
