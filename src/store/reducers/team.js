import { createReducer } from 'store/utils'
import {
  GET_USER_TEAMS_SUCCESS,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  READ_TEAM_REQUEST,
  READ_TEAM_SUCCESS,
  READ_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE
} from 'store/constants/team'
import {
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
  [GET_USER_TEAMS_SUCCESS]: (state, action) => {
    return {
      ...state,
      byId: action.payload.teams.reduce((byId, item) => {
        byId[item.uuid] = item
        return byId
      }, {}),
      allIds: action.payload.teams.map(({ uuid }) => uuid)
    }
  },
  [CREATE_TEAM_REQUEST]: setRequestState,
  [CREATE_TEAM_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.team.uuid,
      byId: {
        ...state.byId,
        [action.payload.team.uuid]: action.payload.team
      },
      allIds: [...state.allIds, action.payload.team.uuid]
    }
  },
  [CREATE_TEAM_FAILURE]: setFailureState,
  [READ_TEAM_REQUEST]: setRequestState,
  [READ_TEAM_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.organization.uuid,
      byId: {
        ...state.byId,
        [action.payload.team.uuid]: {
          ...state.byId[action.payload.team.uuid],
          ...action.payload.team
        }
      }
    }
  },
  [READ_TEAM_FAILURE]: setFailureState,
  [UPDATE_TEAM_REQUEST]: setRequestState,
  [UPDATE_TEAM_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: action.payload.team.uuid,
      byId: {
        ...state.byId,
        [action.payload.team.uuid]: {
          ...state.byId[action.payload.team.uuid],
          ...action.payload.team
        }
      }
    }
  },
  [UPDATE_TEAM_FAILURE]: setFailureState,
  [DELETE_TEAM_REQUEST]: setRequestState,
  [DELETE_TEAM_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        message: '',
        loading: false,
        statusCode: action.payload.statusCode
      },
      current: null,
      byId: removeKey(action.payload.team.uuid, state.byId),
      allIds: state.allIds.filter(uuid => uuid !== action.payload.team.uuid)
    }
  },
  [DELETE_TEAM_FAILURE]: setFailureState,
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
      current: action.payload.team.uuid,
      byId: {
        ...state.byId,
        [action.payload.team.uuid]: {
          ...state.byId[action.payload.team.uuid],
          ...action.payload.team
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
      current: action.payload.team.uuid,
      byId: {
        ...state.byId,
        [action.payload.team.uuid]: {
          ...state.byId[action.payload.team.uuid],
          ...action.payload.team
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
