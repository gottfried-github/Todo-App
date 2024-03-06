import { fork } from 'redux-saga/effects'
import todo from './todo'
import auth from './auth'

export default function* main() {
  yield fork(todo)
  yield fork(auth)
}
