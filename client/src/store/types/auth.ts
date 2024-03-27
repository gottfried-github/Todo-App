import { type ErrorPayload, type UserData } from './common'

/*
  actions, saga
*/
export type SagaPayloadSignup = {
  userName: string
  email: string
  firstName: string
  lastName: string
  password: string
}

export type SagaPayloadSignin = {
  identifier: string
  password: string
}

export type SagaPayloadSignout = {
  server?: boolean
}

/*
  actions, store
*/
export type StorePayloadToken = string
export type StorePayloadErrorSocket = string
export type StorePayloadIsLoading = boolean

/*
  store state
*/
export type StateToken = StorePayloadToken
export type StateError =
  | null
  | (ErrorPayload & {
      errors?: { [key: string]: { message?: string } }
    })

export type StateErrorSocket = null | StorePayloadErrorSocket
export type StateUserData = null | UserData
