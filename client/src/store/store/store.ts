import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducerTeam from './slice-team'
import reducerTodo from './slice-todo'
import reducerAuth from './slice-auth'

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
