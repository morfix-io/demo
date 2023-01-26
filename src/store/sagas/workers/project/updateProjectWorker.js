import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { updateProjectFailure, updateProjectSuccess } from 'store/actions/project'

export default function* updateProjectWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.updateProject, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(updateProjectSuccess(result))
  } catch (error) {
    yield put(updateProjectFailure(error))
  }
}
