import { call, put, takeLatest } from 'redux-saga/effects'
import axios from '../http'

import slice from '../store/slice-auth'

import { signout as actionSignout } from '../actions/auth'

function* signout() {
  try {
    yield call(axios.delete, '/auth')

    yield put({
      type: slice.actions.unsetToken.type,
    })
  } catch (e) {
    console.log('saga, signout, e:', e)
    yield put({
      type: slice.actions.setError.type,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* auth() {
  yield takeLatest(actionSignout.type, signout)
}

export default auth
