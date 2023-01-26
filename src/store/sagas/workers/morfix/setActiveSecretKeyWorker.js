import { call, put } from 'redux-saga/effects'
import { morfixSetActiveSecretKeySuccess, morfixSetActiveSecretKeyFailure } from 'store/actions/morfix'
import utils from 'shared/utils'

export default function* setActiveSecretKeyWorker(action) {
  try {
    const payload = yield call(utils.removeEmptyValues, action.payload)
    yield put(morfixSetActiveSecretKeySuccess(payload))
  } catch (error) {
    yield put(morfixSetActiveSecretKeyFailure(error.payload ? error.payload : error))
  }
}
