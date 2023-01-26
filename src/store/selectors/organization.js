import { createSelector } from 'reselect'

export const selectOrganizationMessage = state => state.organization.request.message
export const selectOrganizationRequestState = state => state.organization.request.loading
export const selectOrganizationResponseStatusCode = state => state.organization.request.statusCode
export const selectOrganizationRequestSuccess = createSelector([selectOrganizationResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})
export const selectOrganizationCurrent = state => state.organization.current
export const selectOrganizations = state => state.organization
