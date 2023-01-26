import { call, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { verifyInvitationFailure, verifyInvitationSuccess } from 'store/actions/session'

export default function* verifyInvitationWorker(action) {
  try {
    const { rest } = yield getContext('api')
    const payload = yield call(utils.removeEmptyValues, action.payload)
    const { data, status } = yield call(rest.backend.verifyInvitation, payload)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(verifyInvitationSuccess(result))
  } catch (error) {
    yield put(verifyInvitationFailure(error))
  }
}
