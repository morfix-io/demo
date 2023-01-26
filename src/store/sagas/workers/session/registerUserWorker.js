import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { registerUserFailure, registerUserSuccess } from 'store/actions/session'

export default function* registerUserWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.iam.registerUser, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(registerUserSuccess(result))
  } catch (error) {
    yield put(registerUserFailure(error))
  }
}
