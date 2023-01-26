import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { createProjectFailure, createProjectSuccess } from 'store/actions/project'

export default function* createProjectWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.createProject, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(createProjectSuccess(result))
  } catch (error) {
    yield put(createProjectFailure(error))
  }
}
