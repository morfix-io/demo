import { take, fork, getContext } from 'redux-saga/effects'

import { GET_USER_ORGANIZATIONS_REQUEST } from 'store/constants/organization'

export default function* getUserOrganizationsWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(GET_USER_ORGANIZATIONS_REQUEST)
    yield fork(workers.organization.getUserOrganizationsWorker, action)
  }
}
