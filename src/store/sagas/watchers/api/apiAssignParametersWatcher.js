import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  API_ASSIGN_PARAMETERS_REQUEST,
  API_ASSIGN_PARAMETERS_SUCCESS,
  API_ASSIGN_PARAMETERS_FAILURE
} from 'store/constants/api'

export default function* apiAssignParametersWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(API_ASSIGN_PARAMETERS_REQUEST)
    yield fork(workers.api.apiAssignParametersWorker, action)

    yield race({
      success: take(API_ASSIGN_PARAMETERS_SUCCESS),
      fail: take(API_ASSIGN_PARAMETERS_FAILURE)
    })
  }
}
