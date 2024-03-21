import { call, put, takeLatest, select } from 'redux-saga/effects'
import { io } from 'socket.io-client'
import axios from '../http'
import socketSubscribe from '../socket-subscribe'

import selectors from '../store/selectors-auth'
import { types as actionTypesSaga } from '../actions/sagas/auth'
import { types as actionTypesStore } from '../actions/store/auth'

let socket = null

function* signup(action) {
  try {
    const res = yield call(axios.post, '/auth/signup', action.payload)

    yield put({
      type: actionTypesStore.setToken,
      payload: res.data.accessToken,
    })

    yield put({
      type: actionTypesStore.setUserData,
      payload: res.data.user,
    })

    yield put({
      type: actionTypesSaga.signedIn,
    })
  } catch (e) {
    console.log('saga, auth, signup, axios errored, e:', e)

    yield put({
      type: actionTypesStore.setErrorSignup,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* signin(action) {
  try {
    const res = yield call(axios.post, '/auth/signin', action.payload)

    yield put({
      type: actionTypesStore.setToken,
      payload: res.data.accessToken,
    })

    yield put({
      type: actionTypesStore.setUserData,
      payload: res.data.user,
    })

    yield put({
      type: actionTypesSaga.signedIn,
    })
  } catch (e) {
    console.log('saga, auth, signin, axios errored, e:', e)

    yield put({
      type: actionTypesStore.setErrorSignin,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* signout(action) {
  try {
    if (action.payload?.server) {
      yield call(axios.delete, '/auth')
    }

    yield put({
      type: actionTypesStore.unsetToken,
    })

    if (socket?.connected) {
      yield call(socket.disconnect.bind(socket))
    }
  } catch (e) {
    console.log('saga, signout, e:', e)
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* authorizeSocket() {
  const token = yield select(state => selectors.selectToken(state))

  if (socket?.connected) {
    return put({
      type: actionTypesStore.setError,
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
  const token = yield select(state => selectors.selectToken(state))

  if (token) return

  try {
    yield put({
      type: actionTypesStore.setIsLoading,
    })

    const res = yield call(axios.get, '/auth/refresh')

    yield put({
      type: actionTypesStore.setToken,
      payload: res.data.accessToken,
    })

    yield put({
      type: actionTypesStore.setUserData,
      payload: res.data.user,
    })

    yield put({
      type: actionTypesSaga.signedIn,
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  } finally {
    yield put({
      type: actionTypesStore.unsetIsLoading,
    })
  }
}

function* auth() {
  yield takeLatest(actionTypesSaga.signup, signup)
  yield takeLatest(actionTypesSaga.signin, signin)
  yield takeLatest(actionTypesSaga.signout, signout)
  yield takeLatest(actionTypesSaga.signedIn, authorizeSocket)

  yield refresh()
}

export default auth
