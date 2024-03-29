import { AxiosResponse } from 'axios'
import { type UserData, type ErrorPayload } from './common'

export type Team = {
  id: string
  name: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

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
export type StorePayloadTeam = Team

/*
  axios responses
*/
export type ResponseCreate = AxiosResponse<Team>
export type ResponseGet = AxiosResponse<{
  data: Team
  members: UserData[]
}>
export type ResponseFreeUsers = AxiosResponse<UserData[]>

/*
  store state
*/
export type StateTeam = null | Team
export type StateError = null | ErrorPayload
