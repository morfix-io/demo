import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { getUserProjectsFailure, getUserProjectsSuccess } from 'store/actions/project'

export default function* getUserProjectsWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.getAllProjects, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(getUserProjectsSuccess(result))
  } catch (error) {
    yield put(getUserProjectsFailure(error))
  }
}
