import {
  GET_USER_TEAMS_FAILURE,
  GET_USER_TEAMS_REQUEST,
  GET_USER_TEAMS_SUCCESS,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  READ_TEAM_REQUEST,
  READ_TEAM_SUCCESS,
  READ_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE
} from 'store/constants/team'
import { createActionCreator } from 'store/utils'

export const getUserTeamsRequest = createActionCreator(GET_USER_TEAMS_REQUEST)
export const getUserTeamsSuccess = createActionCreator(GET_USER_TEAMS_SUCCESS)
export const getUserTeamsFailure = createActionCreator(GET_USER_TEAMS_FAILURE, {
  error: true
})

export const createTeamRequest = createActionCreator(CREATE_TEAM_REQUEST)
export const createTeamSuccess = createActionCreator(CREATE_TEAM_SUCCESS)
export const createTeamFailure = createActionCreator(CREATE_TEAM_FAILURE, {
  error: true
})

export const readTeamRequest = createActionCreator(READ_TEAM_REQUEST)
export const readTeamSuccess = createActionCreator(READ_TEAM_SUCCESS)
export const readTeamFailure = createActionCreator(READ_TEAM_FAILURE, {
  error: true
})

export const deleteTeamRequest = createActionCreator(DELETE_TEAM_REQUEST)
export const deleteTeamSuccess = createActionCreator(DELETE_TEAM_SUCCESS)
export const deleteTeamFailure = createActionCreator(DELETE_TEAM_FAILURE, {
  error: true
})

export const updateTeamRequest = createActionCreator(UPDATE_TEAM_REQUEST)
export const updateTeamSuccess = createActionCreator(UPDATE_TEAM_SUCCESS)
export const updateTeamFailure = createActionCreator(UPDATE_TEAM_FAILURE, {
  error: true
})
