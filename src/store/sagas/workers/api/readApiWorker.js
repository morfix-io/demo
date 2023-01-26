import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { readApiFailure, readApiSuccess } from 'store/actions/api'

export default function* readApiWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.readApi, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(readApiSuccess(result))
  } catch (error) {
    yield put(readApiFailure(error))
  }
}
