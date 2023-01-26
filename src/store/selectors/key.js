import { createSelector } from 'reselect'

export const selectKeyMessage = state => state.key.request.message
export const selectKeyRequestState = state => state.key.request.loading
export const selectKeyResponseStatusCode = state => state.key.request.statusCode
export const selectKeyRequestSuccess = createSelector([selectKeyResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})
export const selectKeyCurrent = state => state.key.current
export const selectKeys = state => state.key
