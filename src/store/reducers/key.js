import { createReducer } from 'store/utils'
import {
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

import { LOGOUT_USER_SUCCESS } from 'store/constants/session'

import { removeKey } from './util'

export const initialState = {
  request: {
    message: '',
    loading: false,
    statusCode: 0
  },
  current: null,
  byId: {},
  allIds: []
}

export default createReducer(initialState, {
  [GET_USER_KEYS_SUCCESS]: (state, action) => {
    return {
      ...state,
      byId: action.payload.keys.reduce((byId, item) => {
        byId[item.uuid] = item
        return byId
      }, {}),
      allIds: action.payload.keys.map(({ uuid }) => uuid)
    }
  },
  [CREATE_KEY_REQUEST]: setRequestState,
  [CREATE_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.key.uuid,
      byId: {
        ...state.byId,
        [action.payload.key.uuid]: action.payload.key
      },
      allIds: [...state.allIds, action.payload.key.uuid]
    }
  },
  [CREATE_KEY_FAILURE]: setFailureState,
  [READ_KEY_REQUEST]: setRequestState,
  [READ_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.key.uuid,
      byId: {
        ...state.byId,
        [action.payload.key.uuid]: {
          ...state.byId[action.payload.key.uuid],
          ...action.payload.key
        }
      },
      allIds: [...new Set([...state.allIds, action.payload.key.uuid])]
    }
  },
  [READ_KEY_FAILURE]: setFailureState,
  [UPDATE_KEY_REQUEST]: setRequestState,
  [UPDATE_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.key.uuid,
      byId: {
        ...state.byId,
        [action.payload.key.uuid]: {
          ...state.byId[action.payload.key.uuid],
          ...action.payload.key
        }
      }
    }
  },
  [UPDATE_KEY_FAILURE]: setFailureState,
  [DELETE_KEY_REQUEST]: setRequestState,
  [DELETE_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: null,
      byId: removeKey(action.payload.key.uuid, state.byId),
      allIds: state.allIds.filter(uuid => uuid !== action.payload.key.uuid)
    }
  },
  [DELETE_KEY_FAILURE]: setFailureState,
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
