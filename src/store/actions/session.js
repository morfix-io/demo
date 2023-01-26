import {
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_RESET_FAILURE,
  VERIFY_RESET_REQUEST,
  VERIFY_RESET_SUCCESS,
  VERIFY_DEVICE_FAILURE,
  VERIFY_DEVICE_REQUEST,
  VERIFY_DEVICE_SUCCESS,
  VERIFY_INVITATION_FAILURE,
  VERIFY_INVITATION_REQUEST,
  VERIFY_INVITATION_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  REFRESH_TOKEN_PROMPT_REQUEST,
  REFRESH_TOKEN_PROMPT_SUCCESS,
  REFRESH_TOKEN_PROMPT_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS
} from 'store/constants/session'
import { createActionCreator } from 'store/utils'

export const registerUserRequest = createActionCreator(REGISTER_USER_REQUEST)
export const registerUserSuccess = createActionCreator(REGISTER_USER_SUCCESS)
export const registerUserFailure = createActionCreator(REGISTER_USER_FAILURE, {
  error: true
})

export const forgotPasswordRequest = createActionCreator(FORGOT_PASSWORD_REQUEST)
export const forgotPasswordSuccess = createActionCreator(FORGOT_PASSWORD_SUCCESS)
export const forgotPasswordFailure = createActionCreator(FORGOT_PASSWORD_FAILURE, {
  error: true
})

export const verifyEmailRequest = createActionCreator(VERIFY_EMAIL_REQUEST)
export const verifyEmailSuccess = createActionCreator(VERIFY_EMAIL_SUCCESS)
export const verifyEmailFailure = createActionCreator(VERIFY_EMAIL_FAILURE, {
  error: true
})

export const verifyResetRequest = createActionCreator(VERIFY_RESET_REQUEST)
export const verifyResetSuccess = createActionCreator(VERIFY_RESET_SUCCESS)
export const verifyResetFailure = createActionCreator(VERIFY_RESET_FAILURE, {
  error: true
})

export const verifyDeviceRequest = createActionCreator(VERIFY_DEVICE_REQUEST)
export const verifyDeviceSuccess = createActionCreator(VERIFY_DEVICE_SUCCESS)
export const verifyDeviceFailure = createActionCreator(VERIFY_DEVICE_FAILURE, {
  error: true
})

export const verifyInvitationRequest = createActionCreator(VERIFY_INVITATION_REQUEST)
export const verifyInvitationSuccess = createActionCreator(VERIFY_INVITATION_SUCCESS)
export const verifyInvitationFailure = createActionCreator(VERIFY_INVITATION_FAILURE, {
  error: true
})

export const loginUserRequest = createActionCreator(LOGIN_USER_REQUEST)
export const loginUserSuccess = createActionCreator(LOGIN_USER_SUCCESS)
export const loginUserFailure = createActionCreator(LOGIN_USER_FAILURE, {
  error: true
})

export const logoutUserRequest = createActionCreator(LOGOUT_USER_REQUEST)
export const logoutUserSuccess = createActionCreator(LOGOUT_USER_SUCCESS)
export const logoutUserFailure = createActionCreator(LOGOUT_USER_FAILURE, {
  error: true
})

export const refreshTokenPromptRequest = createActionCreator(REFRESH_TOKEN_PROMPT_REQUEST)
export const refreshTokenPromptSuccess = createActionCreator(REFRESH_TOKEN_PROMPT_SUCCESS)
export const refreshTokenPromptFailure = createActionCreator(REFRESH_TOKEN_PROMPT_FAILURE, {
  error: true
})

export const refreshTokenRequest = createActionCreator(REFRESH_TOKEN_REQUEST)
export const refreshTokenSuccess = createActionCreator(REFRESH_TOKEN_SUCCESS)
export const refreshTokenFailure = createActionCreator(REFRESH_TOKEN_FAILURE, {
  error: true
})
