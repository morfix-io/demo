import { all, race, take, put, fork, getContext, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE } from 'store/constants/session'

export default function* requestWatcher() {
  const workers = yield getContext('workers')
  const refreshState = {
    retryActions: []
  }
  // Create a channel for all requests except the token refresh. This internally buffers all the requests
  // even when there are blocking calls in the saga. This ensures we don't loose the request.
  const requestChan = yield actionChannel(
    action => action.type.includes('REQUEST') && action.type !== REFRESH_TOKEN_REQUEST,
    buffers.sliding(5)
  )

  while (true) {
    // BLOCKING: We take every REQUEST (except the token refresh).
    const { newRequest, refreshSuccess, refreshFailure } = yield race({
      newRequest: take(requestChan),
      refreshSuccess: take(REFRESH_TOKEN_SUCCESS),
      refreshFailure: take(REFRESH_TOKEN_FAILURE)
    })

    // NONBLOCKING: Wrap regular requests which handles the failure (401) case.
    // Successful requests pass normally.
    if (newRequest) {
      yield fork([refreshState, workers.session.requestWorker], newRequest)
    }

    // NONBLOCKING: If a refresh was successful, we essentially
    // retry all actions and reset initial state
    if (refreshSuccess) {
      yield all(refreshState.retryActions.map(action => put(action)))
      refreshState.retryActions = []
    }

    // NONBLOCKING: If the refresh failed, clear pending actions, redirect to login screen
    if (refreshFailure) {
      // refreshState.retryActions = []
      // TODO: Uncomment this
      // yield put(push(`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.LOGIN}`))
    }
  }
}
