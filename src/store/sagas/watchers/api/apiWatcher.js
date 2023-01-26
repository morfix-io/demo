import { all, getContext } from 'redux-saga/effects'

export default function* apiWatcher() {
  const watchers = yield getContext('watchers')

  yield all([
    watchers.api.getUserApisWatcher(),
    watchers.api.apiAssignParametersWatcher(),
    watchers.api.createApiObjectWatcher(),
    watchers.api.createApiWatcher(),
    watchers.api.readApiWatcher(),
    watchers.api.updateApiWatcher(),
    watchers.api.deleteApiWatcher(),
    watchers.api.removeKeyFromApiWatcher()
  ])
}
