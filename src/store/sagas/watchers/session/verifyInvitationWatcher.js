import { race, delay, take, fork, getContext, put } from 'redux-saga/effects'
import {
  VERIFY_INVITATION_REQUEST,
  VERIFY_INVITATION_SUCCESS,
  VERIFY_INVITATION_FAILURE
} from 'store/constants/session'
import { push } from 'connected-react-router'
import config from 'config'

export default function* verifyInvitationWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(VERIFY_INVITATION_REQUEST)
    yield fork(workers.session.verifyInvitationWorker, action)

    const { success } = yield race({
      success: take(VERIFY_INVITATION_SUCCESS),
      fail: take(VERIFY_INVITATION_FAILURE)
    })

    if (success) {
      yield delay(3000)
      yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.LOGIN}`))
    }
  }
}
