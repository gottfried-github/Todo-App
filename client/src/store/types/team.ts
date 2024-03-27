import { type UserData, type ErrorPayload } from './common'

/*
  actions, saga
*/
export type SagaPayloadTeam = {
  name: string
}

/*
  actions, store
*/
export type StorePayloadUsers = UserData[]

export type StorePayloadTeam = {
  id: string
  name: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

/*
  store state
*/
export type StateTeam = null | StorePayloadTeam
export type StateError = null | ErrorPayload
