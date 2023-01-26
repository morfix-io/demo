import { call, put, getContext } from 'redux-saga/effects'
import { getUserOrganizationsFailure, getUserOrganizationsSuccess } from 'store/actions/organization'

export default function* getUserOrganizationsWorker() {
  try {
    const { rest } = yield getContext('api')
    const { data, status } = yield call(rest.backend.getAllOrganizations)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(getUserOrganizationsSuccess(result))
  } catch (error) {
    yield put(getUserOrganizationsFailure(error))
  }
}
