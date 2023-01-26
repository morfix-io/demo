import watchers from './watchers'
import workers from './workers'
import mainSaga from './main'
import createSagaMiddleware from 'redux-saga'

export default function createSagas(context = {}) {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      ...context,
      watchers,
      workers
    }
  })
  return {
    sagaMiddleware,
    mainSaga
  }
}
