import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import sliceTodo from './slice-todo'
import sliceAuth from './slice-auth'
import saga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    todos: sliceTodo.reducer,
    auth: sliceAuth.reducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger, sagaMiddleware],
})

sagaMiddleware.run(saga)

export default store
