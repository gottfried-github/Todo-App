import { call, put, takeLatest, select } from 'redux-saga/effects'
import { io, Socket } from 'socket.io-client'
import { type Action } from 'redux-actions'
import { AxiosError } from 'axios'

import axios from '../http'
import socketSubscribe from '../socket-subscribe'

import selectors from '../selectors/auth'
import { types as actionTypes } from '../actions/auth'
import type {
  Token,
  SagaPayloadSignup,
  SagaPayloadSignin,
  SagaPayloadSignout,
  ResponseAuth,
} from '../types/auth'

let socket: null | Socket = null

function* signup(action: Action<SagaPayloadSignup>) {
  try {
    const res: ResponseAuth = yield call(axios.post, '/auth/signup', action.payload)

    yield put({
      type: actionTypes.storeSetToken,
      payload: res.data.accessToken,
    })

    yield put({
      type: actionTypes.storeSetUserData,
      payload: res.data.user,
    })

    yield put({
      type: actionTypes.sagaSignedIn,
    })
  } catch (e: unknown) {
    console.log('saga, auth, signup, axios errored, e:', e)

    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypes.storeSetErrorSignup,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypes.storeSetErrorSignup,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* signin(action: Action<SagaPayloadSignin>) {
  try {
    const res: ResponseAuth = yield call(axios.post, '/auth/signin', action.payload)

    yield put({
      type: actionTypes.storeSetToken,
      payload: res.data.accessToken,
    })

    yield put({
      type: actionTypes.storeSetUserData,
      payload: res.data.user,
    })

    yield put({
      type: actionTypes.sagaSignedIn,
    })
  } catch (e: unknown) {
    console.log('saga, auth, signin, axios errored, e:', e)

    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypes.storeSetErrorSignin,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypes.storeSetErrorSignin,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* signout(action: Action<SagaPayloadSignout>) {
  try {
    if (action.payload?.server) {
      yield call(axios.delete, '/auth')
    }

    yield put({
      type: actionTypes.storeUnsetToken,
    })

    if (socket?.connected) {
      yield call(socket.disconnect.bind(socket))
    }
  } catch (e: unknown) {
    console.log('saga, signout, e:', e)

    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypes.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypes.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* authorizeSocket() {
  const token: Token = yield select(state => selectors.selectToken(state))

  if (socket?.connected) {
    return put({
      type: actionTypes.storeSetError,
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

  yield call<any>(socketSubscribe, socket)
}

function* refresh() {
  const token: Token = yield select(state => selectors.selectToken(state))

  if (token) return

  try {
    yield put({
      type: actionTypes.storeSetIsLoading,
    })

    const res: ResponseAuth = yield call(axios.get, '/auth/refresh')

    yield put({
      type: actionTypes.storeSetToken,
      payload: res.data.accessToken,
    })

    yield put({
      type: actionTypes.storeSetUserData,
      payload: res.data.user,
    })

    yield put({
      type: actionTypes.sagaSignedIn,
    })
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypes.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypes.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  } finally {
    yield put({
      type: actionTypes.storeUnsetIsLoading,
    })
  }
}

function* auth() {
  yield takeLatest(actionTypes.sagaSignup, signup)
  yield takeLatest(actionTypes.sagaSignin, signin)
  yield takeLatest(actionTypes.sagaSignout, signout)
  yield takeLatest(actionTypes.sagaSignedIn, authorizeSocket)

  yield refresh()
}

export default auth
