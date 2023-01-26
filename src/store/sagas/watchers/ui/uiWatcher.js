import { all, getContext } from 'redux-saga/effects'

export default function* uiWatcher() {
  const watchers = yield getContext('watchers')

  yield all([
    watchers.ui.createNotificationWatcher(),
    watchers.ui.openNotificationWatcher(),
    watchers.ui.closeNotificationWatcher()
  ])
}
