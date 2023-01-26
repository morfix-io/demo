import { takeEvery, all, getContext } from 'redux-saga/effects'
import { REPORT_ERROR_REQUEST } from 'store/constants/reporter'

export default function* reporterWatcher() {
  const watchers = yield getContext('watchers')
  const workers = yield getContext('workers')
  yield all([
    takeEvery('*', workers.reporter.addBreadcrumbWorker),
    takeEvery(REPORT_ERROR_REQUEST, workers.reporter.reportErrorWorker),
    watchers.reporter.requestErrorReportWatcher()
  ])
}
