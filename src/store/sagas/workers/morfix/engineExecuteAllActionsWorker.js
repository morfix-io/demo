import { put, take, fork, race } from 'redux-saga/effects'
import { morfixEngineExecuteAllActionsSuccess, morfixEngineExecuteAllActionsFailure } from 'store/actions/morfix'
import * as morfixConstants from 'store/constants/morfix'

const successActions = Object.keys(morfixConstants).filter(x => x.includes('SUCCESS'))
const failureActions = Object.keys(morfixConstants).filter(x => x.includes('FAILURE'))

export default function* engineExecuteAllActionsWorker(action) {
  try {
    // Extract the payload
    const { payload } = action
    const actions = Object.values(payload)

    let failedAction = null
    for (let a of actions) {
      yield fork(a.function.action, a.function.payload)
      const { failure } = yield race({
        success: take(action => successActions.includes(action.type)),
        failure: take(action => failureActions.includes(action.type))
      })
      if (failure) {
        failedAction = failure
        break
      }
    }

    if (failedAction) {
      yield put(morfixEngineExecuteAllActionsFailure(failedAction))
      return
    }

    yield put(morfixEngineExecuteAllActionsSuccess(action.payload))
  } catch (error) {
    yield put(morfixEngineExecuteAllActionsFailure(error.payload ? error.payload : error))
  }
}
