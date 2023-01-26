import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { apiAssignParametersFailure, apiAssignParametersSuccess } from 'store/actions/api'

export default function* apiAssignParametersWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.apiAssignParameters, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(apiAssignParametersSuccess(result))
  } catch (error) {
    yield put(apiAssignParametersFailure(error))
  }
}
