import { take, getContext, fork, race, put } from 'redux-saga/effects'
import {
  MORFIX_DELETE_PUBLIC_KEY_REQUEST,
  MORFIX_DELETE_PUBLIC_KEY_SUCCESS,
  MORFIX_DELETE_PUBLIC_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixDeleteEncryptorRequest } from 'store/actions/morfix'

export default function* deletePublicKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_DELETE_PUBLIC_KEY_REQUEST)
    yield fork(workers.morfix.deletePublicKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_DELETE_PUBLIC_KEY_SUCCESS),
      fail: take(MORFIX_DELETE_PUBLIC_KEY_FAILURE)
    })

    // Destruct the Encryptor
    if (success) {
      yield put(morfixDeleteEncryptorRequest())
    }
  }
}
