import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_UPLOAD_SECRET_KEY_REQUEST,
  MORFIX_UPLOAD_SECRET_KEY_SUCCESS,
  MORFIX_UPLOAD_SECRET_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixCreateDecryptorRequest, morfixCreateKeyGeneratorRequest } from 'store/actions/morfix'

import shortid from 'shortid'

export default function* uploadSecretKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_UPLOAD_SECRET_KEY_REQUEST)
    yield fork(workers.morfix.uploadSecretKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_UPLOAD_SECRET_KEY_SUCCESS),
      fail: take(MORFIX_UPLOAD_SECRET_KEY_FAILURE)
    })

    // If the payload manually specified to stop continuation of next sagas, return
    if (action.payload.continue === false) {
      continue
    }

    // Construct the Decryptor
    if (success) {
      yield put(
        morfixCreateDecryptorRequest({
          id: shortid(),
          secretKeyId: success.payload.id
        })
      )

      // Create a new KeyGen after successful upload
      // so the user can immediately generate
      // Relin/Galois Keys with the newly uploaded SecretKey
      yield put(
        morfixCreateKeyGeneratorRequest({
          id: shortid(),
          secret: {
            id: success.payload.id,
            name: success.payload.name
          },
          public: {}
        })
      )
    }
  }
}
