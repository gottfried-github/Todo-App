import { fork } from 'redux-saga/effects'
import team from './team'
import todo from './todo'
import auth from './auth'

export default function* main() {
  yield fork(team)
  yield fork(todo)
  yield fork(auth)
}
