import { take, fork, race, getContext, put } from 'redux-saga/effects'
import { CREATE_API_OBJECT_REQUEST, CREATE_API_OBJECT_SUCCESS, CREATE_API_OBJECT_FAILURE } from 'store/constants/api'
import { push } from 'connected-react-router'

export default function* createApiObjectWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(CREATE_API_OBJECT_REQUEST)
    yield fork(workers.api.createApiObjectWorker, action)

    const { success } = yield race({
      success: take(CREATE_API_OBJECT_SUCCESS),
      fail: take(CREATE_API_OBJECT_FAILURE)
    })

    if (success) {
      yield put(push(action.payload.redirect))
    }
  }
}
