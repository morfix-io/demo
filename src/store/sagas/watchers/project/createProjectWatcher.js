import { take, fork, race, getContext, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  SET_ACTIVE_PROJECT_REQUEST
} from 'store/constants/project'

export default function* createProjectWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(CREATE_PROJECT_REQUEST)
    yield fork(workers.project.createProjectWorker, action)

    const { success } = yield race({
      success: take(CREATE_PROJECT_SUCCESS),
      fail: take(CREATE_PROJECT_FAILURE)
    })

    if (success) {
      // Set the new active project automatically, by publishing another action
      yield put({ type: SET_ACTIVE_PROJECT_REQUEST, payload: success.payload })

      if (action.payload.redirect) {
        yield put(push(action.payload.redirect))
      }
    }
  }
}
