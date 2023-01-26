import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { getUserApisFailure, getUserApisSuccess } from 'store/actions/api'

export default function* getUserApisWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.getAllApis, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(getUserApisSuccess(result))
  } catch (error) {
    yield put(getUserApisFailure(error))
  }
}
