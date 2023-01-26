import { take, put, race } from 'redux-saga/effects'
import { isExpiredSessionError } from 'store/sagas/utils'
import { refreshTokenPromptRequest } from 'store/actions/session'

export default function* requestWorker(action) {
  // BLOCKING: For each request, we race on the success or failure
  const { fail } = yield race({
    success: take(action.type.replace('REQUEST', 'SUCCESS')),
    fail: take(action.type.replace('REQUEST', 'FAILURE'))
  })

  // NONBLOCKING: We only care if a generic request has failed.
  if (fail) {
    const error = fail.payload

    // Check if the failure was because of a 401
    const sessionIsExpired = isExpiredSessionError(error)

    if (sessionIsExpired) {
      // Save the request to retry later
      this.retryActions.push(action)

      // Publish an action that we need to prompt the user for re-auth.
      yield put(refreshTokenPromptRequest())
    }
  }
}
