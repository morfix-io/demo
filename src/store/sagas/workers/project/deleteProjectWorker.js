import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { deleteProjectFailure, deleteProjectSuccess } from 'store/actions/project'

export default function* deleteProjectWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.deleteProject, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(deleteProjectSuccess(result))
  } catch (error) {
    yield put(deleteProjectFailure(error))
  }
}
