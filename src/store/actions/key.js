import {
  GET_USER_KEYS_FAILURE,
  GET_USER_KEYS_REQUEST,
  GET_USER_KEYS_SUCCESS,
  CREATE_KEY_REQUEST,
  CREATE_KEY_SUCCESS,
  CREATE_KEY_FAILURE,
  READ_KEY_REQUEST,
  READ_KEY_SUCCESS,
  READ_KEY_FAILURE,
  UPDATE_KEY_REQUEST,
  UPDATE_KEY_SUCCESS,
  UPDATE_KEY_FAILURE,
  DELETE_KEY_REQUEST,
  DELETE_KEY_SUCCESS,
  DELETE_KEY_FAILURE
} from 'store/constants/key'
import { createActionCreator } from 'store/utils'

export const getUserKeysRequest = createActionCreator(GET_USER_KEYS_REQUEST)
export const getUserKeysSuccess = createActionCreator(GET_USER_KEYS_SUCCESS)
export const getUserKeysFailure = createActionCreator(GET_USER_KEYS_FAILURE, {
  error: true
})

export const createKeyRequest = createActionCreator(CREATE_KEY_REQUEST)
export const createKeySuccess = createActionCreator(CREATE_KEY_SUCCESS)
export const createKeyFailure = createActionCreator(CREATE_KEY_FAILURE, {
  error: true
})

export const readKeyRequest = createActionCreator(READ_KEY_REQUEST)
export const readKeySuccess = createActionCreator(READ_KEY_SUCCESS)
export const readKeyFailure = createActionCreator(READ_KEY_FAILURE, {
  error: true
})

export const updateKeyRequest = createActionCreator(UPDATE_KEY_REQUEST)
export const updateKeySuccess = createActionCreator(UPDATE_KEY_SUCCESS)
export const updateKeyFailure = createActionCreator(UPDATE_KEY_FAILURE, {
  error: true
})

export const deleteKeyRequest = createActionCreator(DELETE_KEY_REQUEST)
export const deleteKeySuccess = createActionCreator(DELETE_KEY_SUCCESS)
export const deleteKeyFailure = createActionCreator(DELETE_KEY_FAILURE, {
  error: true
})
