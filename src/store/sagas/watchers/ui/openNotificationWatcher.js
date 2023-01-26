import { take, fork, getContext } from 'redux-saga/effects'
import { OPEN_NOTIFICATION_REQUEST } from 'store/constants/ui'

export default function* openNotificationWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(OPEN_NOTIFICATION_REQUEST)
    yield fork(workers.ui.openNotificationWorker, action)
  }
}
