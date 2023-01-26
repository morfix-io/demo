import config from 'config'
import request from './request'
import { createIamApi } from './iam'
import { createBackendApi } from './backend'
import { createEngineApi } from './engine'

/**
 * Creates REST API interface.
 *
 * @function
 * @return {Object} REST API interface.
 */
const createRestApi = () => {
  const defaults = {
    timeout: config.REQUEST_TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const iam = request.createRestAPIProvider({
    ...defaults,
    baseURL: config.IAM_HOST
  })

  const backend = request.createRestAPIProvider({
    ...defaults,
    baseURL: config.BACKEND_HOST
  })

  const engine = request.createRestAPIProvider({
    ...defaults,
    baseURL: config.ENGINE_HOST
  })

  return {
    iam: createIamApi(iam),
    backend: createBackendApi(backend),
    engine: createEngineApi(engine)
  }
}

export { createRestApi }
