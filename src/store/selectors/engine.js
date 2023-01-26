import { createSelector } from 'reselect'

export const selectEngineMessage = state => state.engine.request.message
export const selectEngineRequestState = state => state.engine.request.loading
export const selectEngineResponseStatusCode = state => state.engine.request.statusCode
export const selectEngineRequestSuccess = createSelector([selectEngineResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})

export const selectUploadedKey = state => state.engine.uploadedKey
export const selectPrepared = state => state.engine.prepared
