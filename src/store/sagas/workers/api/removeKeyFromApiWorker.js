import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { removeKeyFromApiFailure, removeKeyFromApiSuccess } from 'store/actions/api'

export default function* removeKeyFromApiWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.removeKeyFromApi, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(removeKeyFromApiSuccess(result))
  } catch (error) {
    yield put(removeKeyFromApiFailure(error))
  }
}
