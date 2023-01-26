import { race, take, fork, getContext, put } from 'redux-saga/effects'
import { VERIFY_RESET_REQUEST, VERIFY_RESET_SUCCESS, VERIFY_RESET_FAILURE } from 'store/constants/session'
import { push } from 'connected-react-router'
import config from 'config'

export default function* verifyEmailWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(VERIFY_RESET_REQUEST)
    yield fork(workers.session.verifyResetWorker, action)

    const { success } = yield race({
      success: take(VERIFY_RESET_SUCCESS),
      fail: take(VERIFY_RESET_FAILURE)
    })

    if (success) {
      yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.DASH}/${config.ROUTES.PROJECTS}`))
    }
  }
}
