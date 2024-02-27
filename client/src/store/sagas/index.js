import { all } from 'redux-saga/effects'

import todo from './todo'
// import auth from './auth'

export default function* () {
  yield all([todo])
}
