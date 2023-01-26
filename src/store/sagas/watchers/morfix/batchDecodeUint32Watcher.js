import { take, call, getContext, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { MORFIX_BATCH_DECODE_UINT32_REQUEST } from 'store/constants/morfix'

export default function* batchDecodeUint32Watcher() {
  const workers = yield getContext('workers')
  const throttleChannel = yield actionChannel(MORFIX_BATCH_DECODE_UINT32_REQUEST, buffers.expanding(1))
  while (true) {
    const action = yield take(throttleChannel)
    yield call(workers.morfix.batchDecodeUint32Worker, action)
  }
}
