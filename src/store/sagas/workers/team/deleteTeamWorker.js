import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { deleteTeamFailure, deleteTeamSuccess } from 'store/actions/team'

export default function* deleteTeamWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.deleteTeam, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(deleteTeamSuccess(result))
  } catch (error) {
    yield put(deleteTeamFailure(error))
  }
}
