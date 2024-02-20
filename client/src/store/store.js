import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import slice from './slice'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: slice.reducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger, sagaMiddleware],
})

sagaMiddleware.run(saga)

export default store
