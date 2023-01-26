import { race, take, put, fork, getContext } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from 'store/constants/session'

export default function* loginUserWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(LOGIN_USER_REQUEST)
    yield fork(workers.session.loginUserWorker, action)

    const { success } = yield race({
      success: take(LOGIN_USER_SUCCESS),
      fail: take(LOGIN_USER_FAILURE)
    })

    if (success) {
      if (action.payload.redirect) {
        yield put(push(action.payload.redirect))
      }
    }
  }
}
