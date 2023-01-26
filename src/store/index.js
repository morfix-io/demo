import loggerMiddleware from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { createRootReducer, initialState } from 'store/reducers'
import createSagas from 'store/sagas'

const initStoreLayer = ({ api, services }) => {
  const history = createBrowserHistory()
  const syncState = services.syncState.init({
    errorHandler: services.reporter.sendError
  })
  const { sagaMiddleware, mainSaga } = createSagas({
    api,
    ...services
  })

  const storeMiddlewareList = [loggerMiddleware, sagaMiddleware, createRouterMiddleware(history)]

  // Remove the logger for production
  if (process.env.NODE_ENV === 'production') {
    storeMiddlewareList.shift()
  }

  const loadedState = syncState.loadState(initialState)

  const store = createStore(createRootReducer(history), loadedState, applyMiddleware(...storeMiddlewareList))

  store.subscribe(() => {
    const { session, organization, project } = store.getState()

    syncState.saveState({
      organization: {
        current: organization.current
      },
      project: {
        current: project.current
      },
      session: {
        auth: {
          bearer: session.auth.bearer
        },
        preferences: {
          selectedLanguage: session.preferences.selectedLanguage
        }
      }
    })
  })

  sagaMiddleware.run(mainSaga)

  return { store, history }
}

export default {
  init: initStoreLayer
}
