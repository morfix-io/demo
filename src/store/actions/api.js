import {
  GET_USER_APIS_FAILURE,
  GET_USER_APIS_REQUEST,
  GET_USER_APIS_SUCCESS,
  API_ASSIGN_PARAMETERS_REQUEST,
  API_ASSIGN_PARAMETERS_SUCCESS,
  API_ASSIGN_PARAMETERS_FAILURE,
  CREATE_API_OBJECT_REQUEST,
  CREATE_API_OBJECT_SUCCESS,
  CREATE_API_OBJECT_FAILURE,
  CREATE_API_REQUEST,
  CREATE_API_SUCCESS,
  CREATE_API_FAILURE,
  READ_API_REQUEST,
  READ_API_SUCCESS,
  READ_API_FAILURE,
  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  UPDATE_API_FAILURE,
  DELETE_API_REQUEST,
  DELETE_API_SUCCESS,
  DELETE_API_FAILURE,
  REMOVE_KEY_FROM_API_REQUEST,
  REMOVE_KEY_FROM_API_SUCCESS,
  REMOVE_KEY_FROM_API_FAILURE
} from 'store/constants/api'
import { createActionCreator } from 'store/utils'

export const getUserApisRequest = createActionCreator(GET_USER_APIS_REQUEST)
export const getUserApisSuccess = createActionCreator(GET_USER_APIS_SUCCESS)
export const getUserApisFailure = createActionCreator(GET_USER_APIS_FAILURE, {
  error: true
})

export const apiAssignParametersRequest = createActionCreator(API_ASSIGN_PARAMETERS_REQUEST)
export const apiAssignParametersSuccess = createActionCreator(API_ASSIGN_PARAMETERS_SUCCESS)
export const apiAssignParametersFailure = createActionCreator(API_ASSIGN_PARAMETERS_FAILURE, {
  error: true
})

export const createApiObjectRequest = createActionCreator(CREATE_API_OBJECT_REQUEST)
export const createApiObjectSuccess = createActionCreator(CREATE_API_OBJECT_SUCCESS)
export const createApiObjectFailure = createActionCreator(CREATE_API_OBJECT_FAILURE, {
  error: true
})

export const createApiRequest = createActionCreator(CREATE_API_REQUEST)
export const createApiSuccess = createActionCreator(CREATE_API_SUCCESS)
export const createApiFailure = createActionCreator(CREATE_API_FAILURE, {
  error: true
})

export const readApiRequest = createActionCreator(READ_API_REQUEST)
export const readApiSuccess = createActionCreator(READ_API_SUCCESS)
export const readApiFailure = createActionCreator(READ_API_FAILURE, {
  error: true
})

export const deleteApiRequest = createActionCreator(DELETE_API_REQUEST)
export const deleteApiSuccess = createActionCreator(DELETE_API_SUCCESS)
export const deleteApiFailure = createActionCreator(DELETE_API_FAILURE, {
  error: true
})

export const updateApiRequest = createActionCreator(UPDATE_API_REQUEST)
export const updateApiSuccess = createActionCreator(UPDATE_API_SUCCESS)
export const updateApiFailure = createActionCreator(UPDATE_API_FAILURE, {
  error: true
})

export const removeKeyFromApiRequest = createActionCreator(REMOVE_KEY_FROM_API_REQUEST)
export const removeKeyFromApiSuccess = createActionCreator(REMOVE_KEY_FROM_API_SUCCESS)
export const removeKeyFromApiFailure = createActionCreator(REMOVE_KEY_FROM_API_FAILURE, {
  error: true
})
