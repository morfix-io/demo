import {
  GET_USER_PROJECTS_FAILURE,
  GET_USER_PROJECTS_REQUEST,
  GET_USER_PROJECTS_SUCCESS,
  SET_ACTIVE_PROJECT_REQUEST,
  SET_ACTIVE_PROJECT_SUCCESS,
  SET_ACTIVE_PROJECT_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  READ_PROJECT_REQUEST,
  READ_PROJECT_SUCCESS,
  READ_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  PROJECT_ADD_TEAM_REQUEST,
  PROJECT_ADD_TEAM_SUCCESS,
  PROJECT_ADD_TEAM_FAILURE,
  PROJECT_REMOVE_TEAM_REQUEST,
  PROJECT_REMOVE_TEAM_SUCCESS,
  PROJECT_REMOVE_TEAM_FAILURE
} from 'store/constants/project'
import { createActionCreator } from 'store/utils'

export const getUserProjectsRequest = createActionCreator(GET_USER_PROJECTS_REQUEST)
export const getUserProjectsSuccess = createActionCreator(GET_USER_PROJECTS_SUCCESS)
export const getUserProjectsFailure = createActionCreator(GET_USER_PROJECTS_FAILURE, {
  error: true
})

export const setActiveProjectRequest = createActionCreator(SET_ACTIVE_PROJECT_REQUEST)
export const setActiveProjectSuccess = createActionCreator(SET_ACTIVE_PROJECT_SUCCESS)
export const setActiveProjectFailure = createActionCreator(SET_ACTIVE_PROJECT_FAILURE, {
  error: true
})

export const createProjectRequest = createActionCreator(CREATE_PROJECT_REQUEST)
export const createProjectSuccess = createActionCreator(CREATE_PROJECT_SUCCESS)
export const createProjectFailure = createActionCreator(CREATE_PROJECT_FAILURE, {
  error: true
})

export const readProjectRequest = createActionCreator(READ_PROJECT_REQUEST)
export const readProjectSuccess = createActionCreator(READ_PROJECT_SUCCESS)
export const readProjectFailure = createActionCreator(READ_PROJECT_FAILURE, {
  error: true
})

export const updateProjectRequest = createActionCreator(UPDATE_PROJECT_REQUEST)
export const updateProjectSuccess = createActionCreator(UPDATE_PROJECT_SUCCESS)
export const updateProjectFailure = createActionCreator(UPDATE_PROJECT_FAILURE, {
  error: true
})

export const deleteProjectRequest = createActionCreator(DELETE_PROJECT_REQUEST)
export const deleteProjectSuccess = createActionCreator(DELETE_PROJECT_SUCCESS)
export const deleteProjectFailure = createActionCreator(DELETE_PROJECT_FAILURE, {
  error: true
})

export const projectAddTeamRequest = createActionCreator(PROJECT_ADD_TEAM_REQUEST)
export const projectAddTeamSuccess = createActionCreator(PROJECT_ADD_TEAM_SUCCESS)
export const projectAddTeamFailure = createActionCreator(PROJECT_ADD_TEAM_FAILURE, {
  error: true
})

export const projectRemoveTeamRequest = createActionCreator(PROJECT_REMOVE_TEAM_REQUEST)
export const projectRemoveTeamSuccess = createActionCreator(PROJECT_REMOVE_TEAM_SUCCESS)
export const projectRemoveTeamFailure = createActionCreator(PROJECT_REMOVE_TEAM_FAILURE, {
  error: true
})
