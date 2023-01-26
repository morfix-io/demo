export function removeKey(key, obj) {
  // eslint-disable-next-line no-unused-vars
  const { [key]: _, ...res } = obj
  return res
}
