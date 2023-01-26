import { all, getContext } from 'redux-saga/effects'

export default function* organizationWatcher() {
  const watchers = yield getContext('watchers')

  yield all([
    watchers.organization.getUserOrganizationsWatcher(),
    watchers.organization.setActiveOrganizationWatcher(),
    watchers.organization.createOrganizationWatcher(),
    watchers.organization.deleteOrganizationWatcher()
  ])
}
