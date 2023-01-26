import { all, getContext } from 'redux-saga/effects'

export default function* userWatcher() {
  const watchers = yield getContext('watchers')

  yield all([watchers.user.getUserDataWatcher()])
}
