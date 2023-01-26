export const createActionCreator =
  actionType =>
  (payload, meta = {}) => {
    return {
      type: actionType,
      payload,
      ...meta
    }
  }

export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}
