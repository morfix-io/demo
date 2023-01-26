import { createReducer } from 'store/utils'
import { GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE } from 'store/constants/user'
import { LOGOUT_USER_SUCCESS } from 'store/constants/session'

export const initialState = {
  request: {
    message: '',
    loading: false,
    statusCode: 0
  },
  user: {}
}

export default createReducer(initialState, {
  [GET_USER_DATA_REQUEST]: setRequestState,
  [GET_USER_DATA_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      user: { ...action.payload.user }
    }
  },
  [GET_USER_DATA_FAILURE]: setFailureState,
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
    }
  }
}

function clearSessionState() {
  return {
    ...initialState
  }
}
