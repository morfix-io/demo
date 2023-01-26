import { createActionCreator } from 'store/utils'
import * as actions from 'store/constants/reporter'

export const reportErrorRequest = createActionCreator(actions.REPORT_ERROR_REQUEST)
export const reportErrorSuccess = createActionCreator(actions.REPORT_ERROR_SUCCESS)
export const reportErrorFailure = createActionCreator(actions.REPORT_ERROR_FAILURE, { error: true })
