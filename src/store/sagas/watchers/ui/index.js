import uiWatcher from './uiWatcher'

import createNotificationWatcher from './createNotificationWatcher'
import openNotificationWatcher from './openNotificationWatcher'
import closeNotificationWatcher from './closeNotificationWatcher'

export default {
  createNotificationWatcher,
  openNotificationWatcher,
  closeNotificationWatcher,
  main: uiWatcher
}
