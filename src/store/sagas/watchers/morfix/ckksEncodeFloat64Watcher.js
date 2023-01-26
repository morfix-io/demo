import { take, call, getContext, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { MORFIX_CKKS_ENCODE_FLOAT64_REQUEST } from 'store/constants/morfix'

export default function* ckksEncodeFloat64Watcher() {
  const workers = yield getContext('workers')
  const throttleChannel = yield actionChannel(MORFIX_CKKS_ENCODE_FLOAT64_REQUEST, buffers.expanding(1))
  while (true) {
    const action = yield take(throttleChannel)
    yield call(workers.morfix.ckksEncodeFloat64Worker, action)
  }
}
