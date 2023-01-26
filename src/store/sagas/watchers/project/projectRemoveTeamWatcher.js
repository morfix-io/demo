import { take, fork, getContext } from 'redux-saga/effects'
import { PROJECT_REMOVE_TEAM_REQUEST } from 'store/constants/project'

export default function* projectAddTeamWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(PROJECT_REMOVE_TEAM_REQUEST)
    yield fork(workers.project.projectRemoveTeamWorker, action)
  }
}
