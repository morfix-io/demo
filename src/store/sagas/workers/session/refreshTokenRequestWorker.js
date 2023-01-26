import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { refreshTokenSuccess, refreshTokenFailure } from 'store/actions/session'

export default function* refreshTokenRequestWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const credentials = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.iam.loginUser, credentials)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(refreshTokenSuccess(result))
  } catch (error) {
    yield put(refreshTokenFailure(error))
  }
}
