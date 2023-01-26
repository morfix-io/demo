import organizationWatcher from './organizationWatcher'

import getUserOrganizationsWatcher from './getUserOrganizationsWatcher'
import setActiveOrganizationWatcher from './setActiveOrganizationWatcher'
import deleteOrganizationWatcher from './deleteOrganizationWatcher'
import createOrganizationWatcher from './createOrganizationWatcher'

export default {
  getUserOrganizationsWatcher,
  setActiveOrganizationWatcher,
  createOrganizationWatcher,
  deleteOrganizationWatcher,
  main: organizationWatcher
}
