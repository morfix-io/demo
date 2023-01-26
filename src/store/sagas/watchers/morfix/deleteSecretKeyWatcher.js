import { take, getContext, fork, race, put } from 'redux-saga/effects'
import {
  MORFIX_DELETE_SECRET_KEY_REQUEST,
  MORFIX_DELETE_SECRET_KEY_SUCCESS,
  MORFIX_DELETE_SECRET_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixDeleteDecryptorRequest } from 'store/actions/morfix'

export default function* deleteSecretKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_DELETE_SECRET_KEY_REQUEST)
    yield fork(workers.morfix.deleteSecretKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_DELETE_SECRET_KEY_SUCCESS),
      fail: take(MORFIX_DELETE_SECRET_KEY_FAILURE)
    })

    // Destruct the Encryptor
    if (success) {
      yield put(morfixDeleteDecryptorRequest())
    }
  }
}
