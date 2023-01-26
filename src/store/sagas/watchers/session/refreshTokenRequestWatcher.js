import { take, call, getContext } from 'redux-saga/effects'
import { REFRESH_TOKEN_REQUEST } from 'store/constants/session'

export default function* refreshTokenRequestWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(REFRESH_TOKEN_REQUEST)
    yield call(workers.session.refreshTokenRequestWorker, action)
  }
}
