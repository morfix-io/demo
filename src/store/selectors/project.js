import { createSelector } from 'reselect'

export const selectProjectMessage = state => state.project.request.message
export const selectProjectRequestState = state => state.project.request.loading
export const selectProjectResponseStatusCode = state => state.project.request.statusCode
export const selectProjectRequestSuccess = createSelector([selectProjectResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})
export const selectProjectCurrent = state => state.project.current
export const selectProjects = state => state.project
