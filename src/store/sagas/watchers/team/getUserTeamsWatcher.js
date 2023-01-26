import { take, fork, race, getContext } from 'redux-saga/effects'
import { GET_USER_TEAMS_REQUEST, GET_USER_TEAMS_SUCCESS, GET_USER_TEAMS_FAILURE } from 'store/constants/team'

export default function* getUserTeamsWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(GET_USER_TEAMS_REQUEST)
    yield fork(workers.team.getUserTeamsWorker, action)

    yield race({
      success: take(GET_USER_TEAMS_SUCCESS),
      fail: take(GET_USER_TEAMS_FAILURE)
    })
  }
}
