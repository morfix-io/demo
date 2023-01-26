import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { readKeyFailure, readKeySuccess } from 'store/actions/key'

export default function* readKeyWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.readKey, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(readKeySuccess(result))
  } catch (error) {
    yield put(readKeyFailure(error))
  }
}
