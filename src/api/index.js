import { createRestApi } from './rest'
import { createWorkerApi } from './worker'

/**
 * Initializes API layer.
 *
 * @function
 * @return {Object} API layer
 */
const initApiLayer = () => {
  return {
    rest: createRestApi(),
    worker: createWorkerApi()
  }
}

export default {
  init: initApiLayer
}
