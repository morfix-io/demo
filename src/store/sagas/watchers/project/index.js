import projectWatcher from './projectWatcher'

import getUserProjectsWatcher from './getUserProjectsWatcher'
import deleteProjectWatcher from './deleteProjectWatcher'
import updateProjectWatcher from './updateProjectWatcher'
import setActiveProjectWatcher from './setActiveProjectWatcher'
import createProjectWatcher from './createProjectWatcher'
import readProjectWatcher from './readProjectWatcher'
import projectAddTeamWatcher from './projectAddTeamWatcher'
import projectRemoveTeamWatcher from './projectRemoveTeamWatcher'

export default {
  getUserProjectsWatcher,
  setActiveProjectWatcher,
  createProjectWatcher,
  readProjectWatcher,
  updateProjectWatcher,
  deleteProjectWatcher,
  projectAddTeamWatcher,
  projectRemoveTeamWatcher,
  main: projectWatcher
}
