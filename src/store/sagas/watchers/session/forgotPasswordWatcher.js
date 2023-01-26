import { take, fork, getContext } from 'redux-saga/effects'
import { FORGOT_PASSWORD_REQUEST } from 'store/constants/session'

export default function* loginUserWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(FORGOT_PASSWORD_REQUEST)
    yield fork(workers.session.forgotPasswordWorker, action)
  }
}
