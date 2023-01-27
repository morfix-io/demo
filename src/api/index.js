import { createWorkerApi } from './worker'

/**
 * Initializes API layer.
 *
 * @function
 * @return {Object} API layer
 */
const initApiLayer = () => {
  return {
    worker: createWorkerApi()
  }
}

export default {
  init: initApiLayer
}
