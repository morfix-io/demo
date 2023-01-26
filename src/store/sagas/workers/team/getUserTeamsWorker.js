import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { getUserTeamsFailure, getUserTeamsSuccess } from 'store/actions/team'

export default function* getUserTeamsWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.getAllTeams, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(getUserTeamsSuccess(result))
  } catch (error) {
    yield put(getUserTeamsFailure(error))
  }
}
