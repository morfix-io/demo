import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_GENERATE_SECRET_KEY_REQUEST,
  MORFIX_GENERATE_SECRET_KEY_SUCCESS,
  MORFIX_GENERATE_SECRET_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixCreateDecryptorRequest } from 'store/actions/morfix'

import shortid from 'shortid'

export default function* generateSecretKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_GENERATE_SECRET_KEY_REQUEST)
    yield fork(workers.morfix.generateSecretKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_GENERATE_SECRET_KEY_SUCCESS),
      fail: take(MORFIX_GENERATE_SECRET_KEY_FAILURE)
    })

    // Construct the Decryptor
    if (success) {
      yield put(
        morfixCreateDecryptorRequest({
          id: shortid(),
          secretKeyId: success.payload.id
        })
      )
    }
  }
}
