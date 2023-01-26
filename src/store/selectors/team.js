import { createSelector } from 'reselect'

export const selectTeamMessage = state => state.team.request.message
export const selectTeamRequestState = state => state.team.request.loading
export const selectTeamResponseStatusCode = state => state.team.request.statusCode
export const selectTeamRequestSuccess = createSelector([selectTeamResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})
export const selectTeamCurrent = state => state.team.current
export const selectTeams = state => state.team
