import { put, take } from 'redux-saga/effects'
import { reportErrorRequest } from 'store/actions/reporter'

export default function* requestErrorReportWatcher() {
  while (true) {
    const action = yield take(action => isServerError(action))
    if (action) {
      yield put(reportErrorRequest(action.payload))
    }
  }
}

export function isServerError(action) {
  if (action.type.includes('FAILURE')) {
    const { statusCode } = action.payload
    return /^5\d\d$/.test(statusCode)
  }
  return false
}
