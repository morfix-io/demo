import { getContext, call, put } from 'redux-saga/effects'
import { reportErrorFailure, reportErrorSuccess } from 'store/actions/reporter'

export default function* reportErrorWorker(action) {
  try {
    const reporter = yield getContext('reporter')
    const result = yield call(reporter.sendError, action.payload)
    yield put(reportErrorSuccess(result))
  } catch (error) {
    yield put(reportErrorFailure(error))
    // eslint-disable-next-line
    console.error('Could not send error:', error)
  }
}
