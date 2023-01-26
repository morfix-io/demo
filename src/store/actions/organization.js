import {
  GET_USER_ORGANIZATIONS_FAILURE,
  GET_USER_ORGANIZATIONS_REQUEST,
  GET_USER_ORGANIZATIONS_SUCCESS,
  SET_ACTIVE_ORGANIZATION_REQUEST,
  SET_ACTIVE_ORGANIZATION_SUCCESS,
  SET_ACTIVE_ORGANIZATION_FAILURE,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
  READ_ORGANIZATION_REQUEST,
  READ_ORGANIZATION_SUCCESS,
  READ_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_REQUEST,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAILURE,
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_FAILURE
} from 'store/constants/organization'
import { createActionCreator } from 'store/utils'

export const getUserOrganizationsRequest = createActionCreator(GET_USER_ORGANIZATIONS_REQUEST)
export const getUserOrganizationsSuccess = createActionCreator(GET_USER_ORGANIZATIONS_SUCCESS)
export const getUserOrganizationsFailure = createActionCreator(GET_USER_ORGANIZATIONS_FAILURE, {
  error: true
})

export const setActiveOrganizationRequest = createActionCreator(SET_ACTIVE_ORGANIZATION_REQUEST)
export const setActiveOrganizationSuccess = createActionCreator(SET_ACTIVE_ORGANIZATION_SUCCESS)
export const setActiveOrganizationFailure = createActionCreator(SET_ACTIVE_ORGANIZATION_FAILURE, {
  error: true
})

export const createOrganizationRequest = createActionCreator(CREATE_ORGANIZATION_REQUEST)
export const createOrganizationSuccess = createActionCreator(CREATE_ORGANIZATION_SUCCESS)
export const createOrganizationFailure = createActionCreator(CREATE_ORGANIZATION_FAILURE, {
  error: true
})

export const readOrganizationRequest = createActionCreator(READ_ORGANIZATION_REQUEST)
export const readOrganizationSuccess = createActionCreator(READ_ORGANIZATION_SUCCESS)
export const readOrganizationFailure = createActionCreator(READ_ORGANIZATION_FAILURE, {
  error: true
})

export const updateOrganizationRequest = createActionCreator(UPDATE_ORGANIZATION_REQUEST)
export const updateOrganizationSuccess = createActionCreator(UPDATE_ORGANIZATION_SUCCESS)
export const updateOrganizationFailure = createActionCreator(UPDATE_ORGANIZATION_FAILURE, {
  error: true
})

export const deleteOrganizationRequest = createActionCreator(DELETE_ORGANIZATION_REQUEST)
export const deleteOrganizationSuccess = createActionCreator(DELETE_ORGANIZATION_SUCCESS)
export const deleteOrganizationFailure = createActionCreator(DELETE_ORGANIZATION_FAILURE, {
  error: true
})
