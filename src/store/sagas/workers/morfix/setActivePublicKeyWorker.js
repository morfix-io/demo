import { call, put } from 'redux-saga/effects'
import { morfixSetActivePublicKeySuccess, morfixSetActivePublicKeyFailure } from 'store/actions/morfix'
import utils from 'shared/utils'

export default function* setActivePublicKeyWorker(action) {
  try {
    const payload = yield call(utils.removeEmptyValues, action.payload)
    yield put(morfixSetActivePublicKeySuccess(payload))
  } catch (error) {
    yield put(morfixSetActivePublicKeyFailure(error.payload ? error.payload : error))
  }
}
