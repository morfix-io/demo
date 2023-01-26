import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_CREATE_KEY_GENERATOR_REQUEST,
  MORFIX_CREATE_KEY_GENERATOR_SUCCESS,
  MORFIX_CREATE_KEY_GENERATOR_FAILURE
} from 'store/constants/morfix'

import { morfixGeneratePublicKeyRequest, morfixGenerateSecretKeyRequest } from 'store/actions/morfix'

export default function* createKeyGeneratorWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_CREATE_KEY_GENERATOR_REQUEST)
    yield fork(workers.morfix.createKeyGeneratorWorker, action)

    const { success } = yield race({
      success: take(MORFIX_CREATE_KEY_GENERATOR_SUCCESS),
      fail: take(MORFIX_CREATE_KEY_GENERATOR_FAILURE)
    })

    // If the payload manually specified to stop continuation of next sagas, return
    if (action.payload.continue === false) {
      continue
    }

    // Construct the Key Pairs
    if (success) {
      const { payload } = success
      // If the request didn't instruct to use any previously uploaded
      // keys, then create new ones

      if (payload.public.id) {
        yield put(
          morfixGeneratePublicKeyRequest({
            ...payload.public
          })
        )
      }
      if (payload.secret.id) {
        yield put(
          morfixGenerateSecretKeyRequest({
            ...payload.secret
          })
        )
      }
    }
  }
}
