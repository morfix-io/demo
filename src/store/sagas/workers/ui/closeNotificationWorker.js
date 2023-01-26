import { put } from 'redux-saga/effects'
import { closeNotificationSuccess, closeNotificationFailure } from 'store/actions/ui'

export default function* closeNotificationWorker(action) {
  try {
    yield put(closeNotificationSuccess(action.payload))
  } catch (error) {
    yield put(closeNotificationFailure(error))
  }
}
