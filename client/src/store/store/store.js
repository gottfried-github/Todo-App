import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import sliceTeam from './slice-team'
import reducerTodo from './slice-todo'
import reducerAuth from './slice-auth'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    teams: sliceTeam.reducer,
    todos: reducerTodo,
    auth: reducerAuth,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger, sagaMiddleware],
})

export { store, sagaMiddleware }
