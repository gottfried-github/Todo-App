import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from '../http'

import { create as actionCreate } from '../actions/team'
import { addUser as actionAddUser } from '../actions/team'
import { deleteUser as actionDeleteUser } from '../actions/team'
import { getTeam as actionGetTeam } from '../actions/team'
import { getFreeUsers as actionGetFreeUsers } from '../actions/team'
import { deleteTeam as actionDeleteTeam } from '../actions/team'

import sliceTeam from '../store/slice-team'
import sliceAuth from '../store/slice-auth'

function* create(action) {
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  try {
    const res = yield call(axios.post, '/teams', action.payload)

    // auth slice: set teamId
    yield put({
      type: sliceAuth.actions.setUserData.type,
      payload: { ...userData, teamId: res.data.id },
    })
  } catch (e) {
    yield put({
      type: sliceTeam.actions.setError.type,
      payload: e,
    })
  }
}

function* getTeam() {
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  try {
    const res = yield call(axios.get, `/teams/${userData.teamId}`)

    /*
      set team data
    */
    yield put({
      type: sliceTeam.actions.setData.type,
      payload: res.data.data,
    })

    yield put({
      type: sliceTeam.actions.setMembers.type,
      payload: res.data.members,
    })
  } catch (e) {
    yield put({
      type: sliceTeam.actions.setError.type,
      payload: e,
    })
  }
}

function* getFreeUsers() {
  try {
    const res = yield call(axios.get, '/teams/users')

    yield put({
      type: sliceTeam.actions.setFreeUsers.type,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: sliceTeam.actions.setError.type,
      payload: e,
    })
  }
}

function* addUser(action) {
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  try {
    yield call(axios.post, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: sliceTeam.actions.appendMember.type,
      payload: action.payload,
    })
  } catch (e) {
    yield put({
      type: sliceTeam.actions.setError.type,
      payload: e,
    })
  }
}

function* deleteUser(action) {
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}/users/${action.payload.id}`)

    yield put({
      type: sliceTeam.actions.deleteMember.type,
      payload: action.payload,
    })
  } catch (e) {
    yield put({
      type: sliceTeam.actions.setError.type,
      payload: e,
    })
  }
}

function* deleteTeam() {
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  try {
    yield call(axios.delete, `/teams/${userData.teamId}`)

    // auth slice: set teamId
    yield put({
      type: sliceAuth.actions.setUserData.type,
      payload: { ...userData, teamId: null },
    })
  } catch (e) {
    yield put({
      type: sliceTeam.actions.setError.type,
      payload: e,
    })
  }
}

function* team() {
  yield takeEvery(actionCreate.type, create)
  yield takeEvery(actionGetTeam.type, getTeam)
  yield takeEvery(actionGetFreeUsers.type, getFreeUsers)
  yield takeLatest(actionAddUser.type, addUser)
  yield takeLatest(actionDeleteUser.type, deleteUser)
  yield takeLatest(actionDeleteTeam.type, deleteTeam)
}

export default team
