import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from '../http'

import { create as actionCreate } from '../actions/team'
import { addUser as actionAddUser } from '../actions/team'
import { deleteUser as actionDeleteUser } from '../actions/team'
import { get as actionGet } from '../actions/team'
import { getUsers as actionGetUsers } from '../actions/team'

import sliceTeam from '../store/slice-team'
import sliceAuth from '../store/slice-auth'

function* create(action) {
  const token = yield select(state => sliceAuth.selectors.selectToken(state))
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    const res = yield call(axios.post, '/teams', action.payload, config)

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

function* get() {
  const token = yield select(state => sliceAuth.selectors.selectToken(state))
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    const res = yield call(axios.get, `/teams/${userData.teamId}`, config)

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

function* getUsers() {
  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    const res = yield call(axios.get, '/teams/users', config)

    yield put({
      type: sliceTeam.actions.setUsers.type,
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
  const token = yield select(state => sliceAuth.selectors.selectToken(state))
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    yield call(axios.post, `/teams/${userData.teamId}/users/${action.payload.id}`, config)

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
  const token = yield select(state => sliceAuth.selectors.selectToken(state))
  const userData = yield select(state => sliceAuth.selectors.selectUserData(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    yield call(axios.delete, `/teams/${userData.teamId}/users/${action.payload.id}`, config)

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

function* team() {
  yield takeEvery(actionCreate.type, create)
  yield takeEvery(actionGet.type, get)
  yield takeEvery(actionGetUsers.type, getUsers)
  yield takeLatest(actionAddUser.type, addUser)
  yield takeLatest(actionDeleteUser.type, deleteUser)
}

export default team
