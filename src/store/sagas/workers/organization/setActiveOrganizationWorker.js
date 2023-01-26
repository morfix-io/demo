import { call, put } from 'redux-saga/effects'
import utils from 'shared/utils'
import { setActiveOrganizationFailure, setActiveOrganizationSuccess } from 'store/actions/organization'

export default function* setActiveOrganizationWorker(action) {
  try {
    const payload = yield call(utils.removeEmptyValues, action.payload)
    yield put(setActiveOrganizationSuccess(payload))
  } catch (error) {
    yield put(setActiveOrganizationFailure(error))
  }
}
