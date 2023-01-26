import { call, put } from 'redux-saga/effects'
import { morfixUpdatePlainTextSuccess, morfixUpdatePlainTextFailure } from 'store/actions/morfix'
import utils from 'shared/utils'

export default function* updatePlainTextWorker(action) {
  try {
    const payload = yield call(utils.removeEmptyValues, action.payload)
    yield put(morfixUpdatePlainTextSuccess(payload))
  } catch (error) {
    yield put(morfixUpdatePlainTextFailure(error.payload ? error.payload : error))
  }
}
