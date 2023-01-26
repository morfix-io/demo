export const KEY_TYPES = {
  PUBLIC: 'PUBLIC',
  SECRET: 'SECRET',
  RELIN: 'RELIN',
  GALOIS: 'GALOIS'
}

export const formatSSH = (key, type) => {
  const BEGIN = `-----BEGIN MORFIX ${type} KEY-----`
  const VERSION = `Version: 1.0.0`
  const strArr = key.match(/.{1,64}/g)
  const END = `-----END MORFIX ${type} KEY-----`
  return [BEGIN, VERSION, '', ...strArr, END].join('\n')
}
