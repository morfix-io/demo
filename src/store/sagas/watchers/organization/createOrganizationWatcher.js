import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE
} from 'store/constants/organization'

export default function* createOrganizationWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(CREATE_ORGANIZATION_REQUEST)

    yield fork(workers.organization.createOrganizationWorker, action)

    yield race({
      success: take(CREATE_ORGANIZATION_SUCCESS),
      fail: take(CREATE_ORGANIZATION_FAILURE)
    })
  }
}
