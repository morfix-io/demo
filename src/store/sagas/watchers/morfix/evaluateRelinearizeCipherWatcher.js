import { take, call, getContext, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST } from 'store/constants/morfix'

export default function* evaluateRelinearizeCipherWatcher() {
  const workers = yield getContext('workers')
  const throttleChannel = yield actionChannel(MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST, buffers.expanding(1))
  while (true) {
    const action = yield take(throttleChannel)
    yield call(workers.morfix.evaluateRelinearizeCipherWorker, action)
  }
}
