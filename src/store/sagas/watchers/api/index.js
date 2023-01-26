import apiWatcher from './apiWatcher'

import getUserApisWatcher from './getUserApisWatcher'
import apiAssignParametersWatcher from './apiAssignParametersWatcher'
import createApiObjectWatcher from './createApiObjectWatcher'
import createApiWatcher from './createApiWatcher'
import readApiWatcher from './readApiWatcher'
import updateApiWatcher from './updateApiWatcher'
import deleteApiWatcher from './deleteApiWatcher'
import removeKeyFromApiWatcher from './removeKeyFromApiWatcher'

export default {
  getUserApisWatcher,
  apiAssignParametersWatcher,
  createApiObjectWatcher,
  createApiWatcher,
  readApiWatcher,
  updateApiWatcher,
  deleteApiWatcher,
  removeKeyFromApiWatcher,
  main: apiWatcher
}
