import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { createTeamFailure, createTeamSuccess } from 'store/actions/team'

export default function* createTeamWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.createTeam, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(createTeamSuccess(result))
  } catch (error) {
    yield put(createTeamFailure(error))
  }
}
