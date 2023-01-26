import { call, delay, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { updateApiFailure, updateApiSuccess } from 'store/actions/api'

export default function* updateApiWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    if (Object.prototype.hasOwnProperty.call(payload, 'delay')) {
      yield delay(payload.delay)
    } else {
      yield delay(1000)
    }
    const { data, status } = yield call(rest.backend.updateApi, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(updateApiSuccess(result))
  } catch (error) {
    yield put(updateApiFailure(error))
  }
}
