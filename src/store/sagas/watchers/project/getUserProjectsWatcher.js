import { take, fork, getContext } from 'redux-saga/effects'
import { GET_USER_PROJECTS_REQUEST } from 'store/constants/project'

export default function* getUserProjectsWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(GET_USER_PROJECTS_REQUEST)
    yield fork(workers.project.getUserProjectsWorker, action)
  }
}
