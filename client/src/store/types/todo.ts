import { ErrorPayload } from './common'

type Filter = {
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

type Item = {
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

export type StorePayloadItems = Item[]

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

export type StorePayloadCounters = {
  all: number
  done: number
  notDone: number
}

export type StorePayloadItem = {
  item: Item
  itemsPrev?: Item[]
  counters?: StorePayloadCounters
  filter?: Filter
}

/*
  store state
*/
export type StateItems = Item[]
export type StateFilter = Filter
export type StateCounters = StorePayloadCounters
export type StateError = null | ErrorPayload

/*
export type StateTodo = {
  items: StorePayloadItem[]
  counters: {
    all: number
    done: number
    notDone: number
  }
  filter: {
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
  error: null | ErrorPayload
}
*/
