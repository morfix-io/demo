import { take, fork, race, getContext } from 'redux-saga/effects'
import { DELETE_TEAM_REQUEST, DELETE_TEAM_SUCCESS, DELETE_TEAM_FAILURE } from 'store/constants/team'

export default function* deleteTeamWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(DELETE_TEAM_REQUEST)
    yield fork(workers.team.deleteTeamWorker, action)

    yield race({
      success: take(DELETE_TEAM_SUCCESS),
      fail: take(DELETE_TEAM_FAILURE)
    })
  }
}
