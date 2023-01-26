import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { projectAddTeamFailure, projectAddTeamSuccess } from 'store/actions/project'

export default function* projectAddTeamWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.projectAddTeam, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(projectAddTeamSuccess(result))
  } catch (error) {
    yield put(projectAddTeamFailure(error))
  }
}
