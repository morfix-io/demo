import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_CREATE_CONTEXT_REQUEST,
  MORFIX_CREATE_CONTEXT_SUCCESS,
  MORFIX_CREATE_CONTEXT_FAILURE
} from 'store/constants/morfix'

import {
  morfixCreateBatchEncoderRequest,
  morfixCreateCkksEncoderRequest,
  morfixCreateEvaluatorRequest
} from 'store/actions/morfix'

import shortid from 'shortid'

import { SCHEME_TYPES } from 'shared/constants'

export default function* createContextWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_CREATE_CONTEXT_REQUEST)
    yield fork(workers.morfix.createContextWorker, action)

    const { success } = yield race({
      success: take(MORFIX_CREATE_CONTEXT_SUCCESS),
      fail: take(MORFIX_CREATE_CONTEXT_FAILURE)
    })

    // If the payload manually specified to stop continuation of next sagas, return
    if (action.payload.continue === false) {
      continue
    }

    if (success) {
      const { payload } = success

      if (payload.encParms.schemeType === SCHEME_TYPES.bfv || payload.encParms.schemeType === SCHEME_TYPES.bgv) {
        yield put(
          morfixCreateBatchEncoderRequest({
            id: shortid()
          })
        )
      }
      if (payload.encParms.schemeType === SCHEME_TYPES.ckks) {
        yield put(
          morfixCreateCkksEncoderRequest({
            id: shortid()
          })
        )
      }

      yield put(
        morfixCreateEvaluatorRequest({
          id: shortid()
        })
      )
    }
  }
}
