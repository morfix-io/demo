import { put } from 'redux-saga/effects'
import { logoutUserSuccess, logoutUserFailure } from 'store/actions/session'

export default function* logoutUserWorker() {
  try {
    yield put(logoutUserSuccess())
  } catch (error) {
    yield put(logoutUserFailure(error))
  }
}
