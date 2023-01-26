import { take, fork, race, getContext, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import config from 'config'

import { GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE } from 'store/constants/user'

export default function* getUserDataWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(GET_USER_DATA_REQUEST)

    yield fork(workers.user.getUserDataWorker, action)

    const { fail } = yield race({
      success: take(GET_USER_DATA_SUCCESS),
      fail: take(GET_USER_DATA_FAILURE)
    })

    // This watcher is the exception to the rule.
    // Redirection is typically handled by the refresh watcher/worker pairs,
    // but this route is specifically used to verify the token data. So if
    // the page is refreshed and an invalid token is present we will immediately
    // receive a 401 response and should be redirected back to the login.
    //
    // Other requests to prompt for a refresh will occur while the user already
    // has the browser open.
    if (fail) {
      yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.LOGIN}`))
    }
  }
}
