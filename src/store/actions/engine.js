import { createActionCreator } from 'store/utils'
import {
  ENGINE_UPLOAD_SECRET_KEY_REQUEST,
  ENGINE_UPLOAD_SECRET_KEY_SUCCESS,
  ENGINE_UPLOAD_SECRET_KEY_FAILURE,
  ENGINE_PREPARE_REQUEST,
  ENGINE_PREPARE_SUCCESS,
  ENGINE_PREPARE_FAILURE,
  ENGINE_COMPUTE_REQUEST,
  ENGINE_COMPUTE_SUCCESS,
  ENGINE_COMPUTE_FAILURE,
  ENGINE_RESPONSE_REQUEST,
  ENGINE_RESPONSE_SUCCESS,
  ENGINE_RESPONSE_FAILURE
} from 'store/constants/engine'

export const engineUploadSecretKeyRequest = createActionCreator(ENGINE_UPLOAD_SECRET_KEY_REQUEST)
export const engineUploadSecretKeySuccess = createActionCreator(ENGINE_UPLOAD_SECRET_KEY_SUCCESS)
export const engineUploadSecretKeyFailure = createActionCreator(ENGINE_UPLOAD_SECRET_KEY_FAILURE, {
  error: true
})

export const enginePrepareRequest = createActionCreator(ENGINE_PREPARE_REQUEST)
export const enginePrepareSuccess = createActionCreator(ENGINE_PREPARE_SUCCESS)
export const enginePrepareFailure = createActionCreator(ENGINE_PREPARE_FAILURE, {
  error: true
})

export const engineComputeRequest = createActionCreator(ENGINE_COMPUTE_REQUEST)
export const engineComputeSuccess = createActionCreator(ENGINE_COMPUTE_SUCCESS)
export const engineComputeFailure = createActionCreator(ENGINE_COMPUTE_FAILURE, {
  error: true
})

export const engineResponseRequest = createActionCreator(ENGINE_RESPONSE_REQUEST)
export const engineResponseSuccess = createActionCreator(ENGINE_RESPONSE_SUCCESS)
export const engineResponseFailure = createActionCreator(ENGINE_RESPONSE_FAILURE, {
  error: true
})
