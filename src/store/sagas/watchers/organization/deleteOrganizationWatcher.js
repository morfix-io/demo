import { take, fork, getContext } from 'redux-saga/effects'

import { DELETE_ORGANIZATION_REQUEST } from 'store/constants/organization'

export default function* deleteOrganizationWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(DELETE_ORGANIZATION_REQUEST)
    yield fork(workers.organization.deleteOrganizationWorker, action)
  }
}
