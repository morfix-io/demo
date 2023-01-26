import { createReducer } from 'store/utils'
import {
  GET_USER_ORGANIZATIONS_SUCCESS,
  SET_ACTIVE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
  READ_ORGANIZATION_REQUEST,
  READ_ORGANIZATION_SUCCESS,
  READ_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_REQUEST,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAILURE,
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_FAILURE
} from 'store/constants/organization'
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
  [GET_USER_ORGANIZATIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      byId: action.payload.organizations.reduce((byId, item) => {
        byId[item.uuid] = item
        return byId
      }, {}),
      allIds: action.payload.organizations.map(({ uuid }) => uuid)
    }
  },
  [SET_ACTIVE_ORGANIZATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      current: action.payload.organization.uuid
    }
  },
  [CREATE_ORGANIZATION_REQUEST]: setRequestState,
  [CREATE_ORGANIZATION_SUCCESS]: (state, action) => {
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
        [action.payload.organization.uuid]: action.payload.organization
      },
      allIds: [...state.allIds, action.payload.organization.uuid]
    }
  },
  [CREATE_ORGANIZATION_FAILURE]: setFailureState,
  [READ_ORGANIZATION_REQUEST]: setRequestState,
  [READ_ORGANIZATION_SUCCESS]: (state, action) => {
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
        [action.payload.organization.uuid]: {
          ...state.byId[action.payload.organization.uuid],
          ...action.payload.organization
        }
      }
    }
  },
  [READ_ORGANIZATION_FAILURE]: setFailureState,
  [UPDATE_ORGANIZATION_REQUEST]: setRequestState,
  [UPDATE_ORGANIZATION_SUCCESS]: (state, action) => {
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
        [action.payload.organization.uuid]: {
          ...state.byId[action.payload.organization.uuid],
          ...action.payload.organization
        }
      }
    }
  },
  [UPDATE_ORGANIZATION_FAILURE]: setFailureState,
  [DELETE_ORGANIZATION_REQUEST]: setRequestState,
  [DELETE_ORGANIZATION_SUCCESS]: (state, action) => {
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
  [DELETE_ORGANIZATION_FAILURE]: setFailureState,
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
