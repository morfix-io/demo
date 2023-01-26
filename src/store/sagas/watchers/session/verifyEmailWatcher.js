import { race, delay, take, fork, getContext, put } from 'redux-saga/effects'
import { VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE } from 'store/constants/session'
import { push } from 'connected-react-router'
import config from 'config'

export default function* verifyEmailWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(VERIFY_EMAIL_REQUEST)
    yield fork(workers.session.verifyEmailWorker, action)

    const { success } = yield race({
      success: take(VERIFY_EMAIL_SUCCESS),
      fail: take(VERIFY_EMAIL_FAILURE)
    })

    if (success) {
      yield delay(3000)
      yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.LOGIN}`))
    }
  }
}
