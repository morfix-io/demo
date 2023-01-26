import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { verifyDeviceFailure, verifyDeviceSuccess } from 'store/actions/session'

export default function* verifyDeviceWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.iam.verifyDevice, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(verifyDeviceSuccess(result))
  } catch (error) {
    yield put(verifyDeviceFailure(error))
  }
}
