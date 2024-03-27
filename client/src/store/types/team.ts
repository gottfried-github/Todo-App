import { type UserData } from './common'

/*
  saga
*/
export type SagaPayloadTeam = {
  name: string
}

/*
  store
*/
export type StorePayloadUsers = UserData[]

export type StorePayloadTeam = {
  id: string
  name: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
