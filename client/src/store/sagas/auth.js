import { call, put, takeLatest } from 'redux-saga/effects'
import axios from '../http'

import slice from '../store/slice-auth'

import { signup as actionSignup } from '../actions/auth'
import { signin as actionSignin } from '../actions/auth'
import { signout as actionSignout } from '../actions/auth'

function* signup(action) {
  try {
    const res = yield call(axios.post, '/auth/signup', action.payload)

    yield put({
      type: slice.actions.setToken.type,
      payload: res.data.accessToken,
    })
  } catch (e) {
    console.log('saga, auth, signup, axios errored, e:', e)

    yield put({
      type: slice.actions.setErrorSignup.type,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* signin(action) {
  try {
    const res = yield call(axios.post, '/auth/signin', action.payload)

    yield put({
      type: slice.actions.setToken.type,
      payload: res.data.accessToken,
    })
  } catch (e) {
    console.log('saga, auth, signin, axios errored, e:', e)

    yield put({
      type: slice.actions.setErrorSignin.type,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

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
  yield takeLatest(actionSignup.type, signup)
  yield takeLatest(actionSignin.type, signin)
  yield takeLatest(actionSignout.type, signout)
}

export default auth
