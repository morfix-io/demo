import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { loginUserFailure, loginUserSuccess } from 'store/actions/session'

export default function* loginUserWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.iam.loginUser, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(loginUserSuccess(result))
  } catch (error) {
    yield put(loginUserFailure(error))
  }
}
