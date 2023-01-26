import { put } from 'redux-saga/effects'
import shortid from 'shortid'

import { openNotificationRequest } from 'store/actions/ui'

export default function* createNotificationWorker(action) {
  const notification = action.payload
  if (notification) {
    const payload = {
      id: shortid(),
      type: notification.type,
      name: notification.name ? notification.name : 'NAME',
      message: notification.message ? notification.message : 'MESSAGE',
      statusCode: notification.statusCode ? notification.statusCode : 0
    }
    yield put(openNotificationRequest(payload))
  } else {
    console.log('Got no payload in createNotificationWorker for action:', action)
  }
}
