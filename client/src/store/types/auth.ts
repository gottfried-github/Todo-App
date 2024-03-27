/*
  saga
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
  store
*/
export type StorePayloadToken = string
export type StorePayloadErrorSocket = string
export type StorePayloadIsLoading = boolean
