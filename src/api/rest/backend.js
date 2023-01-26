/**
 * Creates adapter for the Backend REST API provider.
 *
 * @function
 * @return {Object} Backend API interface.
 */
const createBackendApi = apiProvider => {
  return {
    /**
     * Fetches all data belonging to an authenticated user.
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    getUserData() {
      return apiProvider.get('/user')
    },
    /**
     * Fetches projects belonging to an authenticated user.
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    getAllProjects({ organizationUuid }) {
      return apiProvider.get('/user/projects', {
        params: {
          organizationUuid
        }
      })
    },
    /**
     * Fetches teams belonging to an authenticated user.
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    getAllTeams({ organizationUuid }) {
      return apiProvider.get('/user/teams', {
        params: {
          organizationUuid
        }
      })
    },
    /**
     * Fetches organizations belonging to an authenticated user.
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    getAllOrganizations() {
      return apiProvider.get('/user/organizations')
    },

    /**
     * Fetches APIs belonging to an authenticated user.
     *
     * @param {object} options
     * @param {string} options.projectUuid - Project Uuid
     * @returns {Promise<Object>} The data from the URL.
     */
    getAllApis({ projectUuid, organizationUuid }) {
      return apiProvider.get('/user/apis', {
        params: {
          projectUuid,
          organizationUuid
        }
      })
    },

    /**
     * Fetches Keys belonging to an authenticated user.
     *
     * @param {object} options
     * @param {string} options.projectUuid - Project Uuid
     * @returns {Promise<Object>} The data from the URL.
     */
    getAllKeys({ projectUuid, organizationUuid }) {
      return apiProvider.get('/user/keys', {
        params: {
          projectUuid,
          organizationUuid
        }
      })
    },

    /**
     * Verify a user's organization invitation
     *
     * @param {object} options
     * @param {string} options.tkn - Organization verification token
     * @return {Promise<Object>} The data from the URL.
     */
    verifyInvitation({ tkn }) {
      return apiProvider.post('/organization/verify/user', {
        tkn
      })
    },

    /**
     * Create a project
     *
     * @param organizationUuid
     * @param projectName
     * @param teamUuid
     * @param isPrivate
     * @returns {*}
     */
    createProject({ organizationUuid, projectName, teamUuid, isPrivate }) {
      return apiProvider.post('/project', {
        organizationUuid,
        projectName,
        teamUuid,
        isPrivate
      })
    },

    /**
     * Get a project by its hash
     *
     * @param hash
     * @returns {*}
     */
    readProject({ hash }) {
      return apiProvider.get(`/project/${hash}`)
    },

    /**
     * Update a project
     *
     * @param projectUuid
     * @param {Object} data - Object
     * @param {String} data.name - Name of the project
     * @param {Boolean} data.isPrivate - Boolean for isPrivate
     * @returns {Observable<AjaxResponse> | Promise<AxiosResponse<T>> | any}
     */
    updateProject({ projectUuid, data }) {
      return apiProvider.patch('/project', {
        projectUuid,
        data
      })
    },

    /**
     * Delete a project by UUID
     *
     * @param projectUuid - UUID of the project to be deleted
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    deleteProject({ projectUuid }) {
      return apiProvider.delete('/project', {
        data: {
          projectUuid
        }
      })
    },

    /**
     * Add a team to a project
     *
     * @param projectUuid
     * @param teamUuid
     *
     * @returns {Promise<void>}
     */
    projectAddTeam({ projectUuid, teamUuid }) {
      return apiProvider.post('/project/add/team', {
        projectUuid,
        teamUuid
      })
    },

    /**
     * Remove a team from a project
     *
     * @param projectUuid
     * @param teamUuid
     *
     * @returns {Promise<void>}
     */
    projectRemoveTeam({ projectUuid, teamUuid }) {
      return apiProvider.delete('/project/remove/team', {
        data: {
          projectUuid,
          teamUuid
        }
      })
    },

    /**
     * Create a Team
     *
     * @param organizationUuid
     * @param teamName
     * @param isPrivate
     * @returns {*}
     */
    createTeam({ organizationUuid, teamName, isPrivate }) {
      return apiProvider.post('/team', {
        organizationUuid,
        teamName,
        isPrivate
      })
    },

    /**
     * Get a team by its hash
     *
     * @param hash
     * @returns {*}
     */
    readTeam({ hash }) {
      return apiProvider.get(`/team/${hash}`)
    },

    /**
     * Update a team
     *
     * @param name
     * @param isPrivate
     * @returns {Observable<AjaxResponse> | Promise<AxiosResponse<T>> | any}
     */
    updateTeam({ name, isPrivate }) {
      return apiProvider.patch('/team', {
        name,
        isPrivate
      })
    },

    /**
     * Delete a team by UUID
     *
     * @param teamUuid - UUID of the team to be deleted
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    deleteTeam({ teamUuid }) {
      return apiProvider.delete('/team', {
        data: {
          teamUuid
        }
      })
    },

    /**
     * Assign parameters to an API
     *
     * @param {object} options
     * @param {string} options.apiUuid - API Uuid
     * @param {string} options.projectUuid - Project Uuid to assign
     * @param {string} options.secretKeyUuid - SecretKey Uuid to assign
     * @param {string} options.publicKeyUuid - PubKey Uuid to assign
     * @param {string} options.relinKeyUuid - RelinKey Uuid to assign
     * @param {string} options.galoisKeyUuid - GaloisKey Uuid to assign
     * @returns {Promise<Object>} The data from the URL.
     */
    apiAssignParameters({ apiUuid, projectUuid, secretKeyUuid, publicKeyUuid, relinKeyUuid, galoisKeyUuid }) {
      return apiProvider.post('/api/assign/parameters', {
        apiUuid,
        projectUuid,
        secretKeyUuid,
        publicKeyUuid,
        relinKeyUuid,
        galoisKeyUuid
      })
    },

    /**
     * Create a Key
     *
     * @param {object} options
     * @param {string} options.keyName - Key name
     * @param {object} options.projectUuid - Project UUID relation
     * @param {string} [options.key=undefined] - base64 key string
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    createKey({ keyName, type, projectUuid, key = undefined }) {
      return apiProvider.post('/key', {
        keyName,
        type,
        projectUuid,
        key
      })
    },

    /**
     * Get a Key by its hash
     *
     * @param hash
     * @returns {*}
     */
    readKey({ hash }) {
      return apiProvider.get(`/key/${hash}`)
    },

    /**
     * Update a Key
     *
     * @param keyUuid UUID of the key
     * @param type Type of key
     * @param data Object containing data to update
     * @returns {Promise<AxiosResponse<T>> | * | Observable<AjaxResponse>}
     */
    updateKey({ keyUuid, type, data }) {
      return apiProvider.patch('/key', {
        keyUuid,
        type,
        data
      })
    },

    /**
     * Delete a Key by UUID
     *
     * @param keyUuid - UUID of the Key to be deleted
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    deleteKey({ keyUuid, type }) {
      return apiProvider.delete('/key', {
        data: {
          keyUuid,
          type
        }
      })
    },

    /**
     * Create an API
     *
     * @param {object} options
     * @param {string} options.apiName - API name
     * @param {object} options.projectUuid - Project UUID relation
     * @param {boolean} options.isPrivate - Make the API private
     * @param {object} options.encryptionParameters - Encryption Params
     * @param {object} options.variables - Variables
     * @param {array} options.actions - Actions
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    createApi({ apiName, projectUuid, isPrivate, encryptionParameters, variables, actions }) {
      return apiProvider.post('/api', {
        apiName,
        projectUuid,
        isPrivate,
        encryptionParameters,
        variables,
        actions
      })
    },

    /**
     * Get an API by its hash
     *
     * @param hash
     * @returns {*}
     */
    readApi({ hash }) {
      return apiProvider.get(`/api/${hash}`)
    },

    /**
     * Update an API
     *
     * @param apiUuid
     * @param {Object} data - Object
     * @param {String} data.name - Name of the project
     * @param {Boolean} data.isPrivate - Boolean for isPrivate
     * @returns {Observable<AjaxResponse> | Promise<AxiosResponse<T>> | any}
     */
    updateApi({ apiUuid, data }) {
      return apiProvider.patch('/api', {
        apiUuid,
        data
      })
    },

    /**
     * Delete an API by UUID
     *
     * @param apiUuid - UUID of the API to be deleted
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    deleteApi({ apiUuid }) {
      return apiProvider.delete('/api', {
        data: {
          apiUuid
        }
      })
    },

    /**
     * Remove a key from an API by UUID
     *
     * @param apiUuid - UUID of the API to be deleted
     * @param type - Type of key to remove from the API
     *
     * @returns {Promise<Object>} The data from the URL.
     */
    removeKeyFromApi({ apiUuid, type }) {
      return apiProvider.delete('/api/remove/key', {
        data: {
          apiUuid,
          type
        }
      })
    }
  }
}

export { createBackendApi }
