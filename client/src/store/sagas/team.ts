import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from '../http'

import { types as actionTypesSaga } from '../actions/sagas/team'
import { types as actionTypesStore } from '../actions/store/team'
import { types as actionTypesStoreAuth } from '../actions/store/auth'
import selectorsAuth from '../store/selectors-auth'

function* create(action) {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    const res = yield call(axios.post, '/teams', action.payload)

    // auth slice: set teamId
    yield put({
      type: actionTypesStoreAuth.setUserData,
      payload: { ...userData, teamId: res.data.id },
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e,
    })
  }
}

function* getTeam() {
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
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e,
    })
  }
}

function* getFreeUsers() {
  try {
    const res = yield call(axios.get, '/teams/users')

    yield put({
      type: actionTypesStore.setFreeUsers,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e,
    })
  }
}

function* addUser(action) {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.post, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: actionTypesStore.appendMember,
      payload: action.payload,
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e,
    })
  }
}

function* deleteUser(action) {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: actionTypesStore.deleteMember,
      payload: action.payload,
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e,
    })
  }
}

function* deleteTeam() {
  const userData = yield select(state => selectorsAuth.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}`)

    // auth slice: set teamId
    yield put({
      type: actionTypesStoreAuth.setUserData,
      payload: { ...userData, teamId: null },
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e,
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
