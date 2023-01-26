import { createSelector } from 'reselect'

export const selectApiMessage = state => state.api.request.message
export const selectApiRequestState = state => state.api.request.loading
export const selectApiResponseStatusCode = state => state.api.request.statusCode
export const selectApiRequestSuccess = createSelector([selectApiResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})
export const selectApiCurrent = state => state.api.current
export const selectApis = state => state.api
export const selectApiObject = state => state.api.object
