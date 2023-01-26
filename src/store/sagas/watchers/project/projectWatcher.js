import { all, getContext } from 'redux-saga/effects'

export default function* projectWatcher() {
  const watchers = yield getContext('watchers')

  yield all([
    watchers.project.getUserProjectsWatcher(),
    watchers.project.setActiveProjectWatcher(),
    watchers.project.createProjectWatcher(),
    watchers.project.readProjectWatcher(),
    watchers.project.updateProjectWatcher(),
    watchers.project.deleteProjectWatcher(),
    watchers.project.projectAddTeamWatcher(),
    watchers.project.projectRemoveTeamWatcher()
  ])
}
