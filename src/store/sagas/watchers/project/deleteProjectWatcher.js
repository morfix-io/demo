import { take, fork, getContext } from 'redux-saga/effects'
import { DELETE_PROJECT_REQUEST } from 'store/constants/project'

export default function* deleteProjectWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(DELETE_PROJECT_REQUEST)
    yield fork(workers.project.deleteProjectWorker, action)
  }
}
