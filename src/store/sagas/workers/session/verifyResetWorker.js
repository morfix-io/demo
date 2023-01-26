import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { verifyResetFailure, verifyResetSuccess } from 'store/actions/session'

export default function* verifyResetWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.iam.verifyReset, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(verifyResetSuccess(result))
  } catch (error) {
    yield put(verifyResetFailure(error))
  }
}
