import { ERROR_CODES } from 'shared/constants'

export const isExpiredSessionError = error => {
  return [ERROR_CODES.UNAUTHORIZED].includes(error.statusCode)
}

export const getBreadcrumbDataFromAction = action => {
  if (Array.isArray(action.payload)) {
    return action.payload.map(item => JSON.stringify(item, null, 2)).join(', ')
  }
  if (action.payload && typeof action.payload === 'object') {
    return JSON.stringify(action.payload, null, 2)
  }
  return action.payload
}
