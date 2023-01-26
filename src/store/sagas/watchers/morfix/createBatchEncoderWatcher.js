import { take, call, getContext, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { MORFIX_CREATE_BATCH_ENCODER_REQUEST } from 'store/constants/morfix'

export default function* createBatchEncoderWatcher() {
  const workers = yield getContext('workers')
  const throttleChannel = yield actionChannel(MORFIX_CREATE_BATCH_ENCODER_REQUEST, buffers.expanding(1))
  while (true) {
    const action = yield take(throttleChannel)
    yield call(workers.morfix.createBatchEncoderWorker, action)
  }
}
