import { take, fork, getContext } from 'redux-saga/effects'
import { READ_PROJECT_REQUEST } from 'store/constants/project'

export default function* readProjectWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(READ_PROJECT_REQUEST)
    yield fork(workers.project.readProjectWorker, action)
  }
}
