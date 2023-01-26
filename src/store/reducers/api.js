import { createReducer } from 'store/utils'
import {
  API_ASSIGN_PARAMETERS_SUCCESS,
  GET_USER_APIS_SUCCESS,
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

import { LOGOUT_USER_SUCCESS } from 'store/constants/session'

import { removeKey } from './util'

export const initialState = {
  request: {
    message: '',
    loading: false,
    statusCode: 0
  },
  object: {},
  current: null,
  byId: {},
  allIds: []
}

export default createReducer(initialState, {
  [API_ASSIGN_PARAMETERS_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      byId: {
        ...state.byId,
        [action.payload.api.uuid]: {
          ...state.byId[action.payload.api.uuid],
          ...action.payload.api
        }
      }
    }
  },
  [GET_USER_APIS_SUCCESS]: (state, action) => {
    return {
      ...state,
      byId: action.payload.apis.reduce((byId, item) => {
        byId[item.uuid] = item
        return byId
      }, {}),
      allIds: action.payload.apis.map(({ uuid }) => uuid)
    }
  },
  [CREATE_API_OBJECT_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      object: {}
    }
  },
  [CREATE_API_OBJECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: 200
      },
      object: { ...action.payload }
    }
  },
  [CREATE_API_OBJECT_FAILURE]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: action.payload.message,
        loading: false,
        statusCode: 400
      }
    }
  },
  [CREATE_API_REQUEST]: setRequestState,
  [CREATE_API_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.api.uuid,
      byId: {
        ...state.byId,
        [action.payload.api.uuid]: action.payload.api
      },
      allIds: [...state.allIds, action.payload.api.uuid]
    }
  },
  [CREATE_API_FAILURE]: setFailureState,
  [READ_API_REQUEST]: setRequestState,
  [READ_API_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.api.uuid,
      byId: {
        ...state.byId,
        [action.payload.api.uuid]: {
          ...state.byId[action.payload.api.uuid],
          ...action.payload.api
        }
      },
      allIds: [...new Set([...state.allIds, action.payload.api.uuid])]
    }
  },
  [READ_API_FAILURE]: setFailureState,
  [UPDATE_API_REQUEST]: setRequestState,
  [UPDATE_API_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.api.uuid,
      byId: {
        ...state.byId,
        [action.payload.api.uuid]: {
          ...state.byId[action.payload.api.uuid],
          ...action.payload.api
        }
      }
    }
  },
  [UPDATE_API_FAILURE]: setFailureState,
  [DELETE_API_REQUEST]: setRequestState,
  [DELETE_API_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: null,
      byId: removeKey(action.payload.api.uuid, state.byId),
      allIds: state.allIds.filter(uuid => uuid !== action.payload.api.uuid)
    }
  },
  [DELETE_API_FAILURE]: setFailureState,
  [REMOVE_KEY_FROM_API_REQUEST]: setRequestState,
  [REMOVE_KEY_FROM_API_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.api.uuid,
      byId: {
        ...state.byId,
        [action.payload.api.uuid]: {
          ...state.byId[action.payload.api.uuid],
          ...action.payload.api
        }
      }
    }
  },
  [REMOVE_KEY_FROM_API_FAILURE]: setFailureState,
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
