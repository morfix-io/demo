/**
 * Creates adapter for the Engine REST API provider.
 *
 * @function
 * @return {Object} Engine API interface.
 */
const createEngineApi = apiProvider => {
  return {
    /**
     * Send a request for data to be computed by the engine
     *
     * @param hash - Unique hash of the API to be run
     * @param variables - Array of variables (ciphers) to send to be evaluated
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    compute({ hash, variables }) {
      return apiProvider.post('/v1/compute', {
        route: {
          hash
        },
        variables
      })
    }
  }
}

export { createEngineApi }
