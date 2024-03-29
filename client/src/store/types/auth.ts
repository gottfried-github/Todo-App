import { AxiosResponse } from 'axios'
import { type ErrorPayload, type UserData } from './common'

export type Token = string

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
export type StorePayloadToken = Token
export type StorePayloadErrorSocket = string
export type StorePayloadIsLoading = boolean

/*
  axios responses
*/
export type ResponseAuth = AxiosResponse<{
  accessToken: string
  user: UserData
}>

/*
  store state
*/
export type StateToken = Token
export type StateError =
  | null
  | (ErrorPayload & {
      errors?: { [key: string]: { message?: string } }
    })

export type StateErrorSocket = null | StorePayloadErrorSocket
export type StateUserData = null | UserData
