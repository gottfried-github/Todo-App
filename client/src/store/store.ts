import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducerTeam from './reducers/team'
import reducerTodo from './reducers/todo'
import reducerAuth from './reducers/auth'

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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, sagaMiddleware }
