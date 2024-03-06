import { call, put, select, fork } from 'redux-saga/effects'
import axios from '../http'

import sliceAuth from '../store/slice-auth'

import todo from './todo'
import auth from './auth'

function* handleEmptyToken() {
  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  if (token) return

  try {
    yield put({
      type: sliceAuth.actions.setIsLoading.type,
      payload: true,
    })

    const res = yield call(axios.get, '/auth/refresh')

    yield put({
      type: sliceAuth.actions.setToken.type,
      payload: res.data.accessToken,
    })
  } catch (e) {
    yield put({
      type: sliceAuth.actions.setError.type,
      payload: e.response?.data || 'something went wrong',
    })
  } finally {
    yield put({
      type: sliceAuth.actions.setIsLoading.type,
      payload: false,
    })
  }
}

export default function* main() {
  yield fork(todo)
  yield fork(auth)

  yield handleEmptyToken()
}
