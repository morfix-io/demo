import { take, fork, race, getContext, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import config from 'config'
import { CREATE_TEAM_REQUEST, CREATE_TEAM_SUCCESS, CREATE_TEAM_FAILURE } from 'store/constants/team'

export default function* createTeamWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(CREATE_TEAM_REQUEST)
    yield fork(workers.team.createTeamWorker, action)

    const { success } = yield race({
      success: take(CREATE_TEAM_SUCCESS),
      fail: take(CREATE_TEAM_FAILURE)
    })

    if (success) {
      yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.DASH}/${config.ROUTES.TEAMS}`))
    }
  }
}
