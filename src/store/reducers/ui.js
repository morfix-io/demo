import { createReducer } from 'store/utils'
import {
  OPEN_NOTIFICATION_SUCCESS,
  OPEN_NOTIFICATION_FAILURE,
  CLOSE_NOTIFICATION_SUCCESS,
  CLOSE_NOTIFICATION_FAILURE
} from 'store/constants/ui'

export const initialState = {
  notifications: []
}

export default createReducer(initialState, {
  [OPEN_NOTIFICATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      notifications: [...state.notifications, action.payload]
    }
  },
  [OPEN_NOTIFICATION_FAILURE]: (state, action) => {
    return {
      ...state,
      notifications: state.notifications.filter(({ id }) => id !== action.payload.id)
    }
  },
  [CLOSE_NOTIFICATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      notifications: state.notifications.filter(({ id }) => id !== action.payload.id)
    }
  },
  [CLOSE_NOTIFICATION_FAILURE]: (state, action) => {
    return {
      ...state,
      notifications: state.notifications.filter(({ id }) => id !== action.payload.id)
    }
  }
})
