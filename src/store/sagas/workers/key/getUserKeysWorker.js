import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { getUserKeysFailure, getUserKeysSuccess } from 'store/actions/key'

export default function* getUserKeysWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.getAllKeys, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(getUserKeysSuccess(result))
  } catch (error) {
    yield put(getUserKeysFailure(error))
  }
}
