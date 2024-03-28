import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import type { Action } from 'redux-actions'
import { AxiosError } from 'axios'
import axios from '../http'

import type { UserData } from '../types/common'
import type { SagaPayloadTeam, ResponseCreate, ResponseGet, ResponseFreeUsers } from '../types/team'

import { types as actionTypesTeam } from '../actions/team'
import { types as actionTypesAuth } from '../actions/auth'
import selectorsAuth from '../selectors/auth'

function* create(action: Action<SagaPayloadTeam>) {
  const userData: UserData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    const res: ResponseCreate = yield call(axios.post, '/teams', action.payload)

    // auth slice: set teamId
    yield put({
      type: actionTypesAuth.storeSetUserData,
      payload: { ...userData, teamId: res.data.id },
    })
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypesTeam.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypesTeam.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* getTeam() {
  const userData: UserData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    const res: ResponseGet = yield call(axios.get, `/teams/${userData.teamId}`)

    /*
      set team data
    */
    yield put({
      type: actionTypesTeam.storeSetData,
      payload: res.data.data,
    })

    yield put({
      type: actionTypesTeam.storeSetMembers,
      payload: res.data.members,
    })
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypesTeam.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypesTeam.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* getFreeUsers() {
  try {
    const res: ResponseFreeUsers = yield call(axios.get, '/teams/users')

    yield put({
      type: actionTypesTeam.storeSetFreeUsers,
      payload: res.data,
    })
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypesTeam.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypesTeam.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* addUser(action: Action<UserData>) {
  const userData: UserData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.post, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: actionTypesTeam.storeAppendMember,
      payload: action.payload,
    })
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypesTeam.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypesTeam.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* deleteUser(action: Action<UserData>) {
  const userData: UserData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: actionTypesTeam.storeDeleteMember,
      payload: action.payload,
    })
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypesTeam.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypesTeam.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* deleteTeam() {
  const userData: UserData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}`)

    // auth slice: set teamId
    yield put({
      type: actionTypesAuth.storeSetUserData,
      payload: { ...userData, teamId: null },
    })
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) {
      return put({
        type: actionTypesTeam.storeSetError,
        payload: { message: 'something went wrong' },
      })
    }

    yield put({
      type: actionTypesTeam.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* team() {
  yield takeEvery(actionTypesTeam.sagaCreate, create)
  yield takeEvery(actionTypesTeam.sagaGetTeam, getTeam)
  yield takeEvery(actionTypesTeam.sagaGetFreeUsers, getFreeUsers)
  yield takeLatest(actionTypesTeam.sagaAddUser, addUser)
  yield takeLatest(actionTypesTeam.sagaDeleteUser, deleteUser)
  yield takeLatest(actionTypesTeam.sagaDeleteTeam, deleteTeam)
}

export default team
