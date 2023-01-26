import { take, fork, race, getContext, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import config from 'config'
import { CREATE_API_REQUEST, CREATE_API_SUCCESS, CREATE_API_FAILURE } from 'store/constants/api'

export default function* createApiWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(CREATE_API_REQUEST)
    yield fork(workers.api.createApiWorker, action)

    const { success } = yield race({
      success: take(CREATE_API_SUCCESS),
      fail: take(CREATE_API_FAILURE)
    })

    if (success) {
      const { api } = success.payload
      yield put(
        push(`${config.ROUTES.BASE}/${config.ROUTES.DASH}/${config.ROUTES.APIS}/${config.ROUTES.EDIT}/${api.hash}`)
      )
    }
  }
}
