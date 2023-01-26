import { race, take, fork, getContext, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from 'store/constants/session'

export default function* registerUserWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(REGISTER_USER_REQUEST)
    yield fork(workers.session.registerUserWorker, action)

    const { success } = yield race({
      success: take(REGISTER_USER_SUCCESS),
      fail: take(REGISTER_USER_FAILURE)
    })

    if (success) {
      if (action.payload.redirect) {
        yield put(push(action.payload.redirect))
      }
    }
  }
}
