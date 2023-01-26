import { all, getContext } from 'redux-saga/effects'

export default function* engineWatcher() {
  const watchers = yield getContext('watchers')

  yield all([
    watchers.engine.uploadSecretKeyWatcher(),
    watchers.engine.prepareWatcher(),
    watchers.engine.computeWatcher(),
    watchers.engine.responseWatcher()
  ])
}
