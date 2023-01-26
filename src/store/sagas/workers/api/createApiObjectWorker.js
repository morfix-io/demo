import { call, put } from 'redux-saga/effects'
import utils from 'shared/utils'
import { createApiObjectFailure, createApiObjectSuccess } from 'store/actions/api'

export default function* createApiObjectWorker(action) {
  try {
    const { object } = yield call(utils.removeEmptyValues, action.payload)
    yield put(createApiObjectSuccess(object))
  } catch (error) {
    yield put(createApiObjectFailure(error))
  }
}
