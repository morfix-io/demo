const isObject = value => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const removeEmptyValues = obj => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] !== 'boolean') {
      return result
    }
    return {
      ...result,
      [key]: value
    }
  }, {})
}

export default {
  removeEmptyValues,
  isObject
}
