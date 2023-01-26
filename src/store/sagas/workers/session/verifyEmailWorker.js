import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { verifyEmailFailure, verifyEmailSuccess } from 'store/actions/session'

export default function* verifyEmailWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.iam.verifyEmail, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(verifyEmailSuccess(result))
  } catch (error) {
    yield put(verifyEmailFailure(error))
  }
}
