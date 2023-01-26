import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { deleteKeyFailure, deleteKeySuccess } from 'store/actions/key'

export default function* deleteKeyWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.deleteKey, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(deleteKeySuccess(result))
  } catch (error) {
    yield put(deleteKeyFailure(error))
  }
}
