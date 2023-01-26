import { createReducer } from 'store/utils'
import {
  GET_USER_PROJECTS_SUCCESS,
  SET_ACTIVE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  READ_PROJECT_REQUEST,
  READ_PROJECT_SUCCESS,
  READ_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  PROJECT_ADD_TEAM_REQUEST,
  PROJECT_ADD_TEAM_SUCCESS,
  PROJECT_ADD_TEAM_FAILURE,
  PROJECT_REMOVE_TEAM_REQUEST,
  PROJECT_REMOVE_TEAM_SUCCESS,
  PROJECT_REMOVE_TEAM_FAILURE
} from 'store/constants/project'
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
  [GET_USER_PROJECTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      byId: action.payload.projects.reduce((byId, item) => {
        byId[item.uuid] = item
        return byId
      }, {}),
      allIds: action.payload.projects.map(({ uuid }) => uuid)
    }
  },
  [SET_ACTIVE_PROJECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      current: action.payload.project.uuid
    }
  },
  [CREATE_PROJECT_REQUEST]: setRequestState,
  [CREATE_PROJECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.project.uuid,
      byId: {
        ...state.byId,
        [action.payload.project.uuid]: action.payload.project
      },
      allIds: [...state.allIds, action.payload.project.uuid]
    }
  },
  [CREATE_PROJECT_FAILURE]: setFailureState,
  [READ_PROJECT_REQUEST]: setRequestState,
  [READ_PROJECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.project.uuid,
      byId: {
        ...state.byId,
        [action.payload.project.uuid]: {
          ...state.byId[action.payload.project.uuid],
          ...action.payload.project
        }
      }
    }
  },
  [READ_PROJECT_FAILURE]: setFailureState,
  [UPDATE_PROJECT_REQUEST]: setRequestState,
  [UPDATE_PROJECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.project.uuid,
      byId: {
        ...state.byId,
        [action.payload.project.uuid]: {
          ...state.byId[action.payload.project.uuid],
          ...action.payload.project
        }
      }
    }
  },
  [UPDATE_PROJECT_FAILURE]: setFailureState,
  [DELETE_PROJECT_REQUEST]: setRequestState,
  [DELETE_PROJECT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: null,
      byId: removeKey(action.payload.project.uuid, state.byId),
      allIds: state.allIds.filter(uuid => uuid !== action.payload.project.uuid)
    }
  },
  [DELETE_PROJECT_FAILURE]: setFailureState,
  [PROJECT_ADD_TEAM_REQUEST]: setRequestState,
  [PROJECT_ADD_TEAM_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.project.uuid,
      byId: {
        ...state.byId,
        [action.payload.project.uuid]: {
          ...state.byId[action.payload.project.uuid],
          ...action.payload.project
        }
      }
    }
  },
  [PROJECT_ADD_TEAM_FAILURE]: setFailureState,
  [PROJECT_REMOVE_TEAM_REQUEST]: setRequestState,
  [PROJECT_REMOVE_TEAM_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.project.uuid,
      byId: {
        ...state.byId,
        [action.payload.project.uuid]: {
          ...state.byId[action.payload.project.uuid],
          ...action.payload.project
        }
      }
    }
  },
  [PROJECT_REMOVE_TEAM_FAILURE]: setFailureState,
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
