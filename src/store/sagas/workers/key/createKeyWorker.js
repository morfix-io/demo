import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { createKeyFailure, createKeySuccess } from 'store/actions/key'

export default function* createKeyWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.createKey, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(createKeySuccess(result))
  } catch (error) {
    yield put(createKeyFailure(error))
  }
}
