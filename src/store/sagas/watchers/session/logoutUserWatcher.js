import { race, take, put, fork, getContext } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import config from 'config'
import { LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from 'store/constants/session'

export default function* logoutUserWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(LOGOUT_USER_REQUEST)
    yield fork(workers.session.logoutUserWorker, action)

    const { success } = yield race({
      success: take(LOGOUT_USER_SUCCESS),
      fail: take(LOGOUT_USER_FAILURE)
    })

    if (success) {
      yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.LOGIN}`))
    }
  }
}
