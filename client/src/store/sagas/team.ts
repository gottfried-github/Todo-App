import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { type Action } from 'redux-actions'
import axios from '../http'

import { type UserData } from '../actions/types'
import { type Team } from '../actions/sagas/team'

import { types as actionTypesSaga } from '../actions/sagas/team'
import { types as actionTypesStore } from '../actions/store/team'
import { types as actionTypesStoreAuth } from '../actions/store/auth'
import selectorsAuth from '../store/selectors-auth'

function* create(action: Action<Team>): Generator<any, any, any> {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    const res = yield call(axios.post, '/teams', action.payload)

    // auth slice: set teamId
    yield put({
      type: actionTypesStoreAuth.setUserData,
      payload: { ...userData, teamId: res.data.id },
    })
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* getTeam(): Generator<any, any, any> {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    const res = yield call(axios.get, `/teams/${userData.teamId}`)

    /*
      set team data
    */
    yield put({
      type: actionTypesStore.setData,
      payload: res.data.data,
    })

    yield put({
      type: actionTypesStore.setMembers,
      payload: res.data.members,
    })
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* getFreeUsers(): Generator<any, any, any> {
  try {
    const res = yield call(axios.get, '/teams/users')

    yield put({
      type: actionTypesStore.setFreeUsers,
      payload: res.data,
    })
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* addUser(action: Action<UserData>): Generator<any, any, any> {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.post, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: actionTypesStore.appendMember,
      payload: action.payload,
    })
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* deleteUser(action: Action<UserData>): Generator<any, any, any> {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: actionTypesStore.deleteMember,
      payload: action.payload,
    })
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* deleteTeam(): Generator<any, any, any> {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}`)

    // auth slice: set teamId
    yield put({
      type: actionTypesStoreAuth.setUserData,
      payload: { ...userData, teamId: null },
    })
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* team() {
  yield takeEvery(actionTypesSaga.create, create)
  yield takeEvery(actionTypesSaga.getTeam, getTeam)
  yield takeEvery(actionTypesSaga.getFreeUsers, getFreeUsers)
  yield takeLatest(actionTypesSaga.addUser, addUser)
  yield takeLatest(actionTypesSaga.deleteUser, deleteUser)
  yield takeLatest(actionTypesSaga.deleteTeam, deleteTeam)
}

export default team
