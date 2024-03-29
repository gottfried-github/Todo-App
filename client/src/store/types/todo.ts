import { AxiosResponse } from 'axios'
import { ErrorPayload } from './common'

export type Filter = {
  status: null | number
  sort: {
    field: string
    order: number
  }
  pagination: {
    page: number
    pageSize: number
  }
}

export type Item = {
  id: string
  name: string
  status: number
  user: {
    id: string
    userName: string
  }
  createdAt: Date
  updatedAt: Date
}

export type Items = Item[]

export type Counters = {
  all: number
  done: number
  notDone: number
}

/*
  actions, saga
*/
type Update = { id: string; userId: string }

export type SagaPayloadCreate = string

export type SagaPayloadUpdateStatus = Update & {
  status: number
}

export type SagaPayloadUpdateName = Update & {
  name: string
}

export type SagaPayloadDeleteOne = string

/*
  actions, store
*/
export type StorePayloadItemUpdate = {
  id: string
  fields: {
    name?: string
    status?: number
  }
}

export type StorePayloadItems = Items

export type StorePayloadFilter = {
  status?: null | number
  sort?: {
    field: string
    order: number
  }
  pagination?: {
    page: number
    pageSize: number
  }
}

export type StorePayloadCounters = Counters

export type StorePayloadItem = {
  item: Item
  itemsPrev?: Item[]
  counters?: StorePayloadCounters
  filter?: Filter
}

/*
  axios responses
*/
export type ResponseItem = AxiosResponse<Item>
export type ResponseItems = AxiosResponse<{
  counters: Counters
  items: Items
}>

/*
  store state
*/
export type StateItems = Items
export type StateFilter = Filter
export type StateCounters = Counters
export type StateError = null | ErrorPayload
