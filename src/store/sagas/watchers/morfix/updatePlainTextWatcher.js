import { take, fork, cancel, delay, getContext, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { MORFIX_UPDATE_PLAIN_TEXT_REQUEST } from 'store/constants/morfix'

export default function* updatePlainTextWatcher() {
  const workers = yield getContext('workers')
  const throttleChannel = yield actionChannel(MORFIX_UPDATE_PLAIN_TEXT_REQUEST, buffers.sliding(1))

  let lastTask
  while (true) {
    // Take the latest request from the channel
    const action = yield take(throttleChannel)

    // Cancel the last task if any
    if (lastTask) {
      yield cancel(lastTask)
    }

    // Wait a specified amount of time before executing the worker.
    // This is essentially the time in between keystrokes to cancel the
    // previously running task.
    yield delay(500)

    // Finally, run the worker.
    lastTask = yield fork(workers.morfix.updatePlainTextWorker, action)
  }
}
