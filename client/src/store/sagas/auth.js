import { call, put, takeLatest, select } from 'redux-saga/effects'
import { io } from 'socket.io-client'
import axios from '../http'
import socketSubscribe from '../socket-subscribe'

import slice from '../store/slice-auth'

import { signup as actionSignup } from '../actions/auth'
import { signin as actionSignin } from '../actions/auth'
import { signout as actionSignout } from '../actions/auth'
import { signedIn as actionSignedIn } from '../actions/auth'

let socket = null

function* signup(action) {
  try {
    const res = yield call(axios.post, '/auth/signup', action.payload)

    yield put({
      type: slice.actions.setToken.type,
      payload: res.data.accessToken,
    })

    yield put({
      type: slice.actions.setUserData.type,
      payload: res.data.user,
    })

    yield put({
      type: actionSignedIn.type,
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

    yield put({
      type: slice.actions.setUserData.type,
      payload: res.data.user,
    })

    yield put({
      type: actionSignedIn.type,
    })
  } catch (e) {
    console.log('saga, auth, signin, axios errored, e:', e)

    yield put({
      type: slice.actions.setErrorSignin.type,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* signout(action) {
  try {
    if (socket?.connected) {
      yield call(socket.disconnect.bind(socket))
    }

    if (action.payload?.server) {
      yield call(axios.delete, '/auth')
    }

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

function* authorizeSocket() {
  const token = yield select(state => slice.selectors.selectToken(state))

  if (socket?.connected) {
    return put({
      type: slice.actions.setError.type,
      payload: {
        message: 'attempted to connect to the socket server, but socket is already connected',
      },
    })
  }

  socket = yield call(io, 'ws://localhost:3000', {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  yield call(socketSubscribe, socket)
}

function* refresh() {
  const token = yield select(state => slice.selectors.selectToken(state))

  if (token) return

  try {
    yield put({
      type: slice.actions.setIsLoading.type,
      payload: true,
    })

    const res = yield call(axios.get, '/auth/refresh')

    yield put({
      type: slice.actions.setToken.type,
      payload: res.data.accessToken,
    })

    yield put({
      type: slice.actions.setUserData.type,
      payload: res.data.user,
    })

    yield put({
      type: actionSignedIn.type,
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e.response?.data || 'something went wrong',
    })
  } finally {
    yield put({
      type: slice.actions.setIsLoading.type,
      payload: false,
    })
  }
}

function* auth() {
  yield takeLatest(actionSignup.type, signup)
  yield takeLatest(actionSignin.type, signin)
  yield takeLatest(actionSignout.type, signout)
  yield takeLatest(actionSignedIn.type, authorizeSocket)

  yield refresh()
}

export default auth
