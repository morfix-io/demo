import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { engineComputeFailure, engineComputeSuccess } from 'store/actions/engine'

export default function* engineComputeWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.engine.compute, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(engineComputeSuccess(result))
  } catch (error) {
    yield put(engineComputeFailure(error))
  }
}
