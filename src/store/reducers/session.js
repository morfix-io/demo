import { createReducer } from 'store/utils'
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  VERIFY_RESET_REQUEST,
  VERIFY_RESET_FAILURE,
  VERIFY_RESET_SUCCESS,
  VERIFY_DEVICE_REQUEST,
  VERIFY_DEVICE_FAILURE,
  VERIFY_DEVICE_SUCCESS,
  VERIFY_INVITATION_REQUEST,
  VERIFY_INVITATION_FAILURE,
  VERIFY_INVITATION_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REFRESH_TOKEN_PROMPT_REQUEST,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE
} from 'store/constants/session'

export const initialState = {
  preferences: {
    selectedLanguage: 'english'
  },
  request: {
    message: '',
    loading: false,
    statusCode: 0
  },
  auth: {
    prompt: false,
    bearer: ''
  }
}

export default createReducer(initialState, {
  [VERIFY_RESET_REQUEST]: setRequestState,
  [VERIFY_RESET_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      auth: {
        ...state.auth,
        bearer: action.payload.bearer
      }
    }
  },
  [VERIFY_RESET_FAILURE]: setFailureState,
  [VERIFY_EMAIL_REQUEST]: setRequestState,
  [VERIFY_EMAIL_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      }
    }
  },
  [VERIFY_EMAIL_FAILURE]: setFailureState,
  [VERIFY_DEVICE_REQUEST]: setRequestState,
  [VERIFY_DEVICE_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      }
    }
  },
  [VERIFY_DEVICE_FAILURE]: setFailureState,
  [VERIFY_INVITATION_REQUEST]: setRequestState,
  [VERIFY_INVITATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      }
    }
  },
  [VERIFY_INVITATION_FAILURE]: setFailureState,
  [REGISTER_USER_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      auth: {
        ...state.auth,
        bearer: ''
      }
    }
  },
  [REGISTER_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: action.payload.statusCode
      },
      auth: {
        ...state.auth,
        bearer: action.payload.bearer
      }
    }
  },
  [REGISTER_USER_FAILURE]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: action.payload.statusCode
      },
      auth: {
        ...state.auth,
        bearer: ''
      }
    }
  },
  [FORGOT_PASSWORD_REQUEST]: setRequestState,
  [FORGOT_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: action.payload.statusCode
      }
    }
  },
  [FORGOT_PASSWORD_FAILURE]: setFailureState,
  [LOGIN_USER_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      auth: {
        prompt: false,
        bearer: ''
      }
    }
  },
  [LOGIN_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: action.payload.statusCode
      },
      auth: {
        prompt: false,
        bearer: action.payload.bearer
      }
    }
  },
  [LOGIN_USER_FAILURE]: setFailureState,
  [LOGOUT_USER_SUCCESS]: clearSessionState,
  [REFRESH_TOKEN_PROMPT_REQUEST]: state => {
    return {
      ...state,
      auth: {
        ...state.auth,
        prompt: true
      }
    }
  },
  [REFRESH_TOKEN_REQUEST]: setRequestState,
  [REFRESH_TOKEN_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: action.payload.statusCode
      },
      auth: {
        prompt: false,
        bearer: action.payload.bearer
      }
    }
  },
  [REFRESH_TOKEN_FAILURE]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: action.payload.statusCode
      },
      auth: {
        prompt: true,
        bearer: ''
      }
    }
  }
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
    }
  }
}

function clearSessionState() {
  return {
    ...initialState
  }
}
