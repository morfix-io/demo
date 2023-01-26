import { call, put } from 'redux-saga/effects'
import utils from 'shared/utils'
import { setActiveProjectFailure, setActiveProjectSuccess } from 'store/actions/project'

export default function* setActiveProjectWorker(action) {
  try {
    const payload = yield call(utils.removeEmptyValues, action.payload)
    yield put(setActiveProjectSuccess(payload))
  } catch (error) {
    yield put(setActiveProjectFailure(error))
  }
}
