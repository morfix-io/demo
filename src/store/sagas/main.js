import { spawn, call, all, getContext } from 'redux-saga/effects'

export default function* mainSaga() {
  const watchers = yield getContext('watchers')
  const reporter = yield getContext('reporter')

  const keepAlive = saga => {
    let respawned = 0
    return function* keepAliveGen() {
      while (true) {
        if (respawned === 5) {
          return
        }
        try {
          yield call(saga)
          break
        } catch (e) {
          reporter.sendError(e)
        }
        respawned++
      }
    }
  }

  const sagas = Object.values(watchers).map(saga => spawn(keepAlive(saga.main)))

  yield all(sagas)
}
