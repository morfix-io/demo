import { GET_USER_DATA_FAILURE, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS } from 'store/constants/user'
import { createActionCreator } from 'store/utils'

export const getUserDataRequest = createActionCreator(GET_USER_DATA_REQUEST)
export const getUserDataSuccess = createActionCreator(GET_USER_DATA_SUCCESS)
export const getUserDataFailure = createActionCreator(GET_USER_DATA_FAILURE, {
  error: true
})
