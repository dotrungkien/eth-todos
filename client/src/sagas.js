import { put, takeEvery } from 'redux-saga/effects'
import { TODOS_FETCHED } from './constants/ActionTypes'

export function* fetchTodos() {
  yield put({ type: TODOS_FETCHED })
}

export function* watchFetchTodos() {
  yield takeEvery(TODOS_FETCHED, fetchTodos)
}
