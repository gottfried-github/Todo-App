export type UserData = {
  id: string
  userName: string
  firstName: string
  lastName: string
  teamId: string | null
}

export interface ErrorPayload { [key: string]: unknown; message?: string } | string
