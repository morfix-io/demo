import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { forgotPasswordFailure, forgotPasswordSuccess } from 'store/actions/session'

export default function* forgotPasswordWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.iam.forgotPassword, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(forgotPasswordSuccess(result))
  } catch (error) {
    yield put(forgotPasswordFailure(error))
  }
}
