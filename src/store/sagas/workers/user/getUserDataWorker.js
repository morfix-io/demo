import { call, put, getContext } from 'redux-saga/effects'
import { getUserDataFailure, getUserDataSuccess } from 'store/actions/user'

export default function* getUserDataWorker() {
  try {
    const { rest } = yield getContext('api')
    const { data, status } = yield call(rest.backend.getUserData)
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(getUserDataSuccess(result))
  } catch (error) {
    yield put(getUserDataFailure(error))
  }
}
