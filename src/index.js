import apiLayer from './api'
import storeLayer from './store'
import viewLayer from './view'

import reporter from 'shared/services/reporter'
import tracking from 'shared/services/tracking'
import syncState from 'shared/services/syncState'
import utils from 'shared/utils'
import * as constants from 'shared/constants'

import * as serviceWorker from './serviceWorker'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

reporter.init()
tracking.init()

const api = apiLayer.init()

const store = storeLayer.init({
  api,
  services: { reporter, tracking, syncState }
})
const view = viewLayer.init({ store, utils, constants: { ...constants } })

view.render()
