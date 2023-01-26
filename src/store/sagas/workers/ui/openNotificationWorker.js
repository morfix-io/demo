import { put } from 'redux-saga/effects'
import { openNotificationSuccess, openNotificationFailure } from 'store/actions/ui'

export default function* openNotificationWorker(action) {
  try {
    yield put(openNotificationSuccess(action.payload))
  } catch (error) {
    yield put(openNotificationFailure(error))
  }
}
