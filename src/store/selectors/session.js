import { createSelector } from 'reselect'

export const selectSessionMessage = state => state.session.request.message
export const selectSessionRequestState = state => state.session.request.loading
export const selectSessionResponseStatusCode = state => state.session.request.statusCode
export const selectSessionRequestSuccess = createSelector([selectSessionResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})

export const selectSessionPreferences = state => state.session.preferences
export const selectSessionIsLoggedIn = state => Boolean(state.session.auth.bearer)
export const selectSessionPrompt = state => state.session.auth.prompt
export const selectSessionBearer = state => state.session.auth.bearer
