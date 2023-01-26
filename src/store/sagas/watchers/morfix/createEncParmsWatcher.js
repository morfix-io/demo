import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_CREATE_ENC_PARMS_REQUEST,
  MORFIX_CREATE_ENC_PARMS_SUCCESS,
  MORFIX_CREATE_ENC_PARMS_FAILURE,
  MORFIX_CREATE_CONTEXT_SUCCESS,
  MORFIX_CREATE_CONTEXT_FAILURE
} from 'store/constants/morfix'

import { morfixCreateContextRequest } from 'store/actions/morfix'

import shortid from 'shortid'

export default function* createEncParmsWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_CREATE_ENC_PARMS_REQUEST)
    yield fork(workers.morfix.createEncParmsWorker, action)

    const { success } = yield race({
      success: take(MORFIX_CREATE_ENC_PARMS_SUCCESS),
      fail: take(MORFIX_CREATE_ENC_PARMS_FAILURE)
    })

    // If the payload manually specified to stop continuation of next sagas, return
    if (action.payload.continue === false) {
      continue
    }

    if (success) {
      yield put(
        morfixCreateContextRequest({
          id: shortid()
        })
      )

      yield race({
        success: take(MORFIX_CREATE_CONTEXT_SUCCESS),
        fail: take(MORFIX_CREATE_CONTEXT_FAILURE)
      })
    }
  }
}
