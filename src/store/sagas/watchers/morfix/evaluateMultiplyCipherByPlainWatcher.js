import { take, call, getContext, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST } from 'store/constants/morfix'

export default function* evaluateMultiplyCipherByPlainWatcher() {
  const workers = yield getContext('workers')
  const throttleChannel = yield actionChannel(MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST, buffers.expanding(1))
  while (true) {
    const action = yield take(throttleChannel)
    yield call(workers.morfix.evaluateMultiplyCipherByPlainWorker, action)
  }
}
