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

function* team() {
  yield takeEvery(actionCreate.type, create)
}

export default team
