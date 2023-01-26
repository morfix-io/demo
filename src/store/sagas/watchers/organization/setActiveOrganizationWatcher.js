import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  SET_ACTIVE_ORGANIZATION_REQUEST,
  SET_ACTIVE_ORGANIZATION_SUCCESS,
  SET_ACTIVE_ORGANIZATION_FAILURE
} from 'store/constants/organization'

export default function* setActiveOrganizationWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(SET_ACTIVE_ORGANIZATION_REQUEST)
    yield fork(workers.organization.setActiveOrganizationWorker, action)

    yield race({
      success: take(SET_ACTIVE_ORGANIZATION_SUCCESS),
      fail: take(SET_ACTIVE_ORGANIZATION_FAILURE)
    })
  }
}
