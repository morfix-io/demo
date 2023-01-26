import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { updateKeyFailure, updateKeySuccess } from 'store/actions/key'

export default function* updateKeyWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.updateKey, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(updateKeySuccess(result))
  } catch (error) {
    yield put(updateKeyFailure(error))
  }
}
