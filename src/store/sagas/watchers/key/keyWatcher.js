import { all, getContext } from 'redux-saga/effects'

export default function* keyWatcher() {
  const watchers = yield getContext('watchers')

  yield all([
    watchers.key.getUserKeysWatcher(),
    watchers.key.createKeyWatcher(),
    watchers.key.readKeyWatcher(),
    watchers.key.updateKeyWatcher(),
    watchers.key.deleteKeyWatcher()
  ])
}
