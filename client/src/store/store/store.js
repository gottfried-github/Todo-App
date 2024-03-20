import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import sliceTeam from './slice-team'
import reducerTodo from './slice-todo'
import sliceAuth from './slice-auth'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    teams: sliceTeam.reducer,
    todos: reducerTodo,
    auth: sliceAuth.reducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger, sagaMiddleware],
})

export { store, sagaMiddleware }
