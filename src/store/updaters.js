export const set = (fieldName, forceValue) => {
  return (state, action) => {
    return {
      ...state,
      [fieldName]: forceValue !== undefined ? forceValue : action.payload
    }
  }
}

export const merge =
  (additionalValues = {}, withPayload = true) =>
  (state, action) => {
    return {
      ...state,
      ...(withPayload && action.payload ? action.payload : {}),
      ...additionalValues
    }
  }

export const mergeInField =
  (fieldName, additionalValues = {}) =>
  (state, action) => {
    return {
      ...state,
      ...additionalValues,
      [fieldName]: {
        ...state[fieldName],
        ...action.payload
      }
    }
  }

export const addToArray = fieldName => (state, action) => {
  return {
    ...state,
    [fieldName]: [...state[fieldName], action.payload]
  }
}

export const removeFromArrayByIndex = fieldName => (state, action) => {
  return {
    ...state,
    [fieldName]: [
      ...state[fieldName].slice(0, action.payload.index),
      ...state[fieldName].slice(action.payload.index + 1)
    ]
  }
}

export const increment = fieldName => state => {
  return {
    ...state,
    [fieldName]: state[fieldName] + 1
  }
}
