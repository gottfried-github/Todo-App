import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducerTeam, { type SliceTeam } from './slice-team'
import reducerTodo, { type SliceTodo } from './slice-todo'
import reducerAuth, { type SliceAuth } from './slice-auth'

export type State = {
  teams: SliceTeam
  todos: SliceTodo
  auth: SliceAuth
}

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(logger, sagaMiddleware)

const store = createStore(
  combineReducers({
    teams: reducerTeam,
    todos: reducerTodo,
    auth: reducerAuth,
  }),
  undefined,
  enhancer
)

export { store, sagaMiddleware }
