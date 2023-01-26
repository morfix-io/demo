import { take, fork, race, getContext, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
// import config from 'config'
import {
  SET_ACTIVE_PROJECT_REQUEST,
  SET_ACTIVE_PROJECT_SUCCESS,
  SET_ACTIVE_PROJECT_FAILURE
} from 'store/constants/project'

export default function* setActiveProjectWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(SET_ACTIVE_PROJECT_REQUEST)
    yield fork(workers.project.setActiveProjectWorker, action)

    const { success } = yield race({
      success: take(SET_ACTIVE_PROJECT_SUCCESS),
      fail: take(SET_ACTIVE_PROJECT_FAILURE)
    })

    if (success) {
      const { route } = success.payload
      if (route) {
        yield put(push(route))
      }
      // yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.DASH}/${config.ROUTES.APIS}/${project.hash}`))
      // yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.DASH}/${config.ROUTES.PROJECTS}`))
    }
  }
}
