import { take, fork, getContext } from 'redux-saga/effects'
import { CLOSE_NOTIFICATION_REQUEST } from 'store/constants/ui'

export default function* closeNotificationWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(CLOSE_NOTIFICATION_REQUEST)
    yield fork(workers.ui.closeNotificationWorker, action)
  }
}
