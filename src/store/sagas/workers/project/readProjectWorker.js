import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { readProjectFailure, readProjectSuccess } from 'store/actions/project'

export default function* readProjectWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.readProject, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(readProjectSuccess(result))
  } catch (error) {
    yield put(readProjectFailure(error))
  }
}
