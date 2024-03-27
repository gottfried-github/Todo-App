/*
  saga
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
  store
*/
export type StorePayloadItem = {
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

export type StorePayloadItemUpdate = {
  id: string
  fields: {
    name?: string
    status?: number
  }
}

export type StorePayloadItems = {
  counters: {
    all: number
    done: number
    notDone: number
  }
  items: StorePayloadItem[]
}

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
