import {
  OPEN_NOTIFICATION_REQUEST,
  OPEN_NOTIFICATION_SUCCESS,
  OPEN_NOTIFICATION_FAILURE,
  CLOSE_NOTIFICATION_REQUEST,
  CLOSE_NOTIFICATION_SUCCESS,
  CLOSE_NOTIFICATION_FAILURE
} from 'store/constants/ui'
import { createActionCreator } from 'store/utils'

export const openNotificationRequest = createActionCreator(OPEN_NOTIFICATION_REQUEST)
export const openNotificationSuccess = createActionCreator(OPEN_NOTIFICATION_SUCCESS)
export const openNotificationFailure = createActionCreator(OPEN_NOTIFICATION_FAILURE, {
  error: true
})

export const closeNotificationRequest = createActionCreator(CLOSE_NOTIFICATION_REQUEST)
export const closeNotificationSuccess = createActionCreator(CLOSE_NOTIFICATION_SUCCESS)
export const closeNotificationFailure = createActionCreator(CLOSE_NOTIFICATION_FAILURE, {
  error: true
})
