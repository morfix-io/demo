import { race, delay, take, fork, getContext, put } from 'redux-saga/effects'
import { VERIFY_DEVICE_REQUEST, VERIFY_DEVICE_SUCCESS, VERIFY_DEVICE_FAILURE } from 'store/constants/session'
import { push } from 'connected-react-router'
import config from 'config'

export default function* verifyDeviceWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(VERIFY_DEVICE_REQUEST)
    yield fork(workers.session.verifyDeviceWorker, action)

    const { success } = yield race({
      success: take(VERIFY_DEVICE_SUCCESS),
      fail: take(VERIFY_DEVICE_FAILURE)
    })

    if (success) {
      yield delay(3000)
      yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.LOGIN}`))
    }
  }
}
