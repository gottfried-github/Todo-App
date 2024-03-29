import { Action, ReducerMap, handleActions as handleActionsOriginal } from 'redux-actions'

export type UserData = {
  id: string
  userName: string
  firstName: string
  lastName: string
  teamId: string | null
}

export type ErrorPayload = {
  [key: string]: unknown
  message?: string
}

type ReducerWithPayload<State, Payload> = (state: State, action: Action<Payload>) => State

export function handleActionsTyped<State, ActionPayloads>(
  handlers: {
    [K in keyof ActionPayloads]?: ReducerWithPayload<State, ActionPayloads[K]>
  },
  defaultState: State
) {
  return handleActionsOriginal(handlers as ReducerMap<State, State>, defaultState)
}
