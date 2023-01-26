/**
 * Creates adapter for Identity Access Management (IAM) REST API provider.
 *
 * @function
 * @return {Object} IAM API interface.
 */
const createIamApi = apiProvider => {
  return {
    /**
     * Register a new user
     *
     * @param {object} options
     * @param {string} options.email - users email.
     * @param {string} options.password - users password.
     * @param {string} options.password - users organization name.
     * @return {Promise<Object>} The data from the URL.
     */
    registerUser({ email, password, organizationName }) {
      return apiProvider.post('/register', {
        email,
        password,
        organizationName
      })
    },

    /**
     * Verify a user's registration email
     *
     * @param tkn
     * @param {object} options
     * @param {string} options.tkn - Email verification token
     * @return {Promise<Object>} The data from the URL.
     */
    verifyEmail({ tkn }) {
      return apiProvider.post('/verify/register', {
        tkn
      })
    },

    /**
     * Verify a user's new device email
     *
     * @param tkn
     * @param {object} options
     * @param {string} options.tkn - Device verification token
     * @return {Promise<Object>} The data from the URL.
     */
    verifyDevice({ tkn }) {
      return apiProvider.post('/verify/device', {
        tkn
      })
    },

    /**
     * Verify a user's password reset email
     *
     * @param {object} options
     * @param {string} options.tkn - Reset verification token
     * @param {string} options.password - Reset verification token
     * @return {Promise<Object>} The data from the URL.
     */
    verifyReset({ tkn, password }) {
      return apiProvider.post('/verify/reset', {
        tkn,
        password
      })
    },

    /**
     * Submit a request for a password reset email link to be sent
     *
     * @param {object} options
     * @param {string} options.email - Email to send the password reset link
     * @return {Promise<Object>} The data from the URL.
     */
    forgotPassword({ email }) {
      return apiProvider.post('/reset', {
        email
      })
    },

    /**
     * Logs user into the system.
     *
     * @async
     * @param {object} options
     * @param {string} options.email - users email.
     * @param {string} options.password - users password.
     * @return {Promise<Object>} The data from the URL.
     */
    loginUser({ email, password }) {
      return apiProvider.post('/login', {
        email,
        password
      })
    },

    /**
     * Logs out user from the system.
     *
     * @async
     * @return {Promise<Object>} The data from the URL.
     */
    logoutUser() {
      return apiProvider.post('/logout')
    },

    /**
     * Fetches logged in user data.
     *
     * @async
     * @return {Promise<Object>} The data from the URL.
     */
    getUser() {
      return apiProvider.get('/user')
    }
  }
}

export { createIamApi }
