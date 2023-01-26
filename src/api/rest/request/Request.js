import RequestError from './RequestError'

class Request {
  /**
   * Represents interface for making XMLHTTPRequests requests.
   *
   * @constructor
   * @param {Object} axios - lib for performing requests.
   */
  constructor(axios) {
    this.axios = axios

    Request.requestInterceptor = Request.requestInterceptor.bind(this)
    Request.responseErrorInterceptor = Request.responseErrorInterceptor.bind(this)
  }

  /**
   * Creates API provider of a specified host.
   *
   * @param {Object} options
   * @return {Object} API provider
   */
  createRestAPIProvider(options) {
    const apiProvider = this.axios.create(options)

    apiProvider.defaults.withCredentials = false
    apiProvider.interceptors.request.use(Request.requestInterceptor)
    apiProvider.interceptors.response.use(null, Request.responseErrorInterceptor)
    return apiProvider
  }

  /**
   * Method that is invoked before request is made.
   *
   * @callback
   * @param {Object} config
   * @param {Object} config.headers - headers that are set before request is made.
   * @return {Object} config
   */
  static requestInterceptor(config) {
    const stringState = window.localStorage.getItem('state')
    if (stringState) {
      const { session } = JSON.parse(stringState)
      config.headers['Authorization'] = `Bearer ${session.auth.bearer}`
    }

    return config
  }

  /**
   * Method that is invoked if request fails.
   *
   * @async
   * @callback
   * @param {Object} error
   * @param {Object=} error.response - response object
   * @param {Object=} error.request - request object.
   * @return {Object} config
   */
  static responseErrorInterceptor(error) {
    const { response, request } = error
    if (response) {
      const error = response.data.error || response.data
      const requestError = new RequestError(error)
      return Promise.reject(requestError)
    }
    if (request) {
      const requestError = new RequestError({
        message: 'The request was made, but no response was received.'
      })
      return Promise.reject(requestError)
    }
    const requestError = new RequestError()
    return Promise.reject(requestError)
  }
}

export default Request
