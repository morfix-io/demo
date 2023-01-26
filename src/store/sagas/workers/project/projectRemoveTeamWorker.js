import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { projectRemoveTeamFailure, projectRemoveTeamSuccess } from 'store/actions/project'

export default function* projectRemoveTeamWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.projectRemoveTeam, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(projectRemoveTeamSuccess(result))
  } catch (error) {
    yield put(projectRemoveTeamFailure(error))
  }
}
