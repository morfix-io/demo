import { createReducer } from 'store/utils'
import {
  ENGINE_UPLOAD_SECRET_KEY_REQUEST,
  ENGINE_UPLOAD_SECRET_KEY_SUCCESS,
  ENGINE_UPLOAD_SECRET_KEY_FAILURE,
  ENGINE_COMPUTE_REQUEST,
  ENGINE_COMPUTE_SUCCESS,
  ENGINE_COMPUTE_FAILURE,
  ENGINE_PREPARE_REQUEST,
  ENGINE_PREPARE_SUCCESS,
  ENGINE_PREPARE_FAILURE
} from 'store/constants/engine'

import { LOGOUT_USER_SUCCESS } from 'store/constants/session'

export const initialState = {
  request: {
    message: '',
    loading: false,
    statusCode: 0
  },
  uploadedKey: false,
  prepared: false
}

export default createReducer(initialState, {
  [ENGINE_UPLOAD_SECRET_KEY_REQUEST]: setRequestState,
  [ENGINE_UPLOAD_SECRET_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      uploadedKey: true
    }
  },
  [ENGINE_UPLOAD_SECRET_KEY_FAILURE]: setFailureState,
  [ENGINE_PREPARE_REQUEST]: setRequestState,
  [ENGINE_PREPARE_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      prepared: true
    }
  },
  [ENGINE_PREPARE_FAILURE]: setFailureState,
  [ENGINE_COMPUTE_REQUEST]: setRequestState,
  [ENGINE_COMPUTE_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      prepared: false
    }
  },
  [ENGINE_COMPUTE_FAILURE]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 400
      }
    }
  },
  [LOGOUT_USER_SUCCESS]: clearSessionState
})

function setRequestState(state) {
  return {
    ...state,
    request: {
      ...state.request,
      loading: true,
      statusCode: 0
    }
  }
}

function setFailureState(state, action) {
  return {
    ...state,
    request: {
      ...state.request,
      message: action.payload.message,
      loading: false,
      statusCode: (action.payload && action.payload.statusCode) || 400
    },
    prepared: false
  }
}

function clearSessionState() {
  return {
    ...initialState
  }
}
