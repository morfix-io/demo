import { call, put } from 'redux-saga/effects'
import { morfixUpdateCipherTextSuccess, morfixUpdateCipherTextFailure } from 'store/actions/morfix'
import utils from 'shared/utils'

export default function* updateCipherTextWorker(action) {
  try {
    const payload = yield call(utils.removeEmptyValues, action.payload)
    yield put(morfixUpdateCipherTextSuccess(payload))
  } catch (error) {
    yield put(morfixUpdateCipherTextFailure(error.payload ? error.payload : error))
  }
}
