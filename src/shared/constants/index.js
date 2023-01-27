/**
 * Error status codes
 * @type {{CONFLICT: number, INTERNAL_SERVER: number, LOCKED: number, UNAUTHORIZED: number, BAD_REQUEST: number, INVALID_TOKEN: number, NOT_FOUND: number, FORBIDDEN: number}}
 */
export const ERROR_CODES = {
  BAD_REQUEST: 400, // Invalid input
  UNAUTHORIZED: 401, // User token is not valid (expired, invalid)
  FORBIDDEN: 403, // Unauthorized access due to privileges
  NOT_FOUND: 404, // Resource was not found
  CONFLICT: 409, // Existing resource conflict
  LOCKED: 423, // Soft account lockout
  INVALID_TOKEN: 498, // Invalid 2FA token
  INTERNAL_SERVER: 500 // Unknown server error
}

export const NOTIFICATION_TYPES = {
  ERROR: 'error',
  AUTH: 'auth',
  INFO: 'info',
  SUCCESS: 'success'
}

export const SCHEME_TYPES = {
  none: 'none',
  bfv: 'bfv',
  bgv: 'bgv',
  ckks: 'ckks'
}

export const SECURITY_LEVELS = {
  none: 'none',
  BITS_128: '128 Bits',
  BITS_192: '192 Bits',
  BITS_256: '256 Bits'
}

export const POLYMODULUS_DEGREES = {
  // BITS_2: '2 Bits',
  // BITS_4: '4 Bits',
  // BITS_8: '8 Bits',
  // BITS_16: '16 Bits',
  // BITS_32: '32 Bits',
  // BITS_64: '64 Bits',
  // BITS_128: '128 Bits',
  // BITS_256: '256 Bits',
  // BITS_512: '512 Bits',
  BITS_1024: '1024 Bits',
  BITS_2048: '2048 Bits',
  BITS_4096: '4096 Bits',
  BITS_8192: '8192 Bits',
  BITS_16384: '16384 Bits',
  BITS_32768: '32768 Bits'
}

export const ENCODERS = {
  BATCH_ENCODER_INT32: 'Batch Encoder (Int32)',
  BATCH_ENCODER_UINT32: 'Batch Encoder (Uint32)',
  CKKS_ENCODER_FLOAT64: 'Ckks Encoder (JS Number)'
}

// BFVDefault()
export const BFV_COEFF_MOD_BIT_SIZES = {
  [SECURITY_LEVELS.BITS_128]: {
    [POLYMODULUS_DEGREES.BITS_1024]: [27],
    [POLYMODULUS_DEGREES.BITS_2048]: [54],
    [POLYMODULUS_DEGREES.BITS_4096]: [36, 36, 37],
    [POLYMODULUS_DEGREES.BITS_8192]: [43, 43, 44, 44, 44],
    [POLYMODULUS_DEGREES.BITS_16384]: [48, 48, 48, 49, 49, 49, 49, 49, 49],
    [POLYMODULUS_DEGREES.BITS_32768]: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 56]
  },
  [SECURITY_LEVELS.BITS_192]: {
    [POLYMODULUS_DEGREES.BITS_1024]: [19],
    [POLYMODULUS_DEGREES.BITS_2048]: [37],
    [POLYMODULUS_DEGREES.BITS_4096]: [25, 25, 25],
    [POLYMODULUS_DEGREES.BITS_8192]: [38, 38, 38, 38],
    [POLYMODULUS_DEGREES.BITS_16384]: [50, 50, 50, 50, 50, 50],
    [POLYMODULUS_DEGREES.BITS_32768]: [54, 54, 54, 54, 54, 55, 55, 55, 55, 55, 55]
  },
  [SECURITY_LEVELS.BITS_256]: {
    [POLYMODULUS_DEGREES.BITS_1024]: [14],
    [POLYMODULUS_DEGREES.BITS_2048]: [29],
    [POLYMODULUS_DEGREES.BITS_4096]: [58],
    [POLYMODULUS_DEGREES.BITS_8192]: [39, 39, 40],
    [POLYMODULUS_DEGREES.BITS_16384]: [47, 47, 47, 48, 48],
    [POLYMODULUS_DEGREES.BITS_32768]: [52, 53, 53, 53, 53, 53, 53, 53, 53]
  }
}

export const CKKS_COEFF_MOD_BIT_SIZES = {
  [SECURITY_LEVELS.BITS_128]: {
    [POLYMODULUS_DEGREES.BITS_1024]: [27],
    [POLYMODULUS_DEGREES.BITS_2048]: [54],
    [POLYMODULUS_DEGREES.BITS_4096]: [46, 16, 46],
    [POLYMODULUS_DEGREES.BITS_8192]: [60, 20, 20, 20, 20, 60],
    [POLYMODULUS_DEGREES.BITS_16384]: [60, 39, 39, 39, 39, 39, 39, 39, 39, 60],
    [POLYMODULUS_DEGREES.BITS_32768]: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 56]
  },
  [SECURITY_LEVELS.BITS_192]: {
    [POLYMODULUS_DEGREES.BITS_1024]: [19],
    [POLYMODULUS_DEGREES.BITS_2048]: [37],
    [POLYMODULUS_DEGREES.BITS_4096]: [29, 16, 29],
    [POLYMODULUS_DEGREES.BITS_8192]: [56, 20, 20, 56],
    [POLYMODULUS_DEGREES.BITS_16384]: [60, 39, 39, 39, 39, 60],
    [POLYMODULUS_DEGREES.BITS_32768]: [54, 54, 54, 54, 54, 55, 55, 55, 55, 55, 55]
  },
  [SECURITY_LEVELS.BITS_256]: {
    [POLYMODULUS_DEGREES.BITS_1024]: [14],
    [POLYMODULUS_DEGREES.BITS_2048]: [29],
    [POLYMODULUS_DEGREES.BITS_4096]: [58],
    [POLYMODULUS_DEGREES.BITS_8192]: [39, 20, 20, 39],
    [POLYMODULUS_DEGREES.BITS_16384]: [60, 39, 39, 39, 60],
    [POLYMODULUS_DEGREES.BITS_32768]: [52, 53, 53, 53, 53, 53, 53, 53, 53]
  }
}

/*
 * We set some known encoder scales for quick access
 * hestdparms.h
 */
export const ENCODER_SCALES = {
  [SECURITY_LEVELS.BITS_128]: {
    [POLYMODULUS_DEGREES.BITS_1024]: 27, // max 27
    [POLYMODULUS_DEGREES.BITS_2048]: 54, // max 54
    [POLYMODULUS_DEGREES.BITS_4096]: 16, // max 109
    [POLYMODULUS_DEGREES.BITS_8192]: 20, // max 218
    [POLYMODULUS_DEGREES.BITS_16384]: 39, // max 438
    [POLYMODULUS_DEGREES.BITS_32768]: 55 // max 881
  },
  [SECURITY_LEVELS.BITS_192]: {
    [POLYMODULUS_DEGREES.BITS_1024]: 19, // max 19
    [POLYMODULUS_DEGREES.BITS_2048]: 37, // max 37
    [POLYMODULUS_DEGREES.BITS_4096]: 16, // max 75
    [POLYMODULUS_DEGREES.BITS_8192]: 20, // max 152
    [POLYMODULUS_DEGREES.BITS_16384]: 39, // max 300
    [POLYMODULUS_DEGREES.BITS_32768]: 54 // max 611
  },
  [SECURITY_LEVELS.BITS_256]: {
    [POLYMODULUS_DEGREES.BITS_1024]: 14, // max 14
    [POLYMODULUS_DEGREES.BITS_2048]: 29, // max 29
    [POLYMODULUS_DEGREES.BITS_4096]: 25, // max 58
    [POLYMODULUS_DEGREES.BITS_8192]: 20, // max 118
    [POLYMODULUS_DEGREES.BITS_16384]: 39, // max 237
    [POLYMODULUS_DEGREES.BITS_32768]: 52 // max 476
  }
}

/*
 * Can be derived from an internal method, but we are
 * using this constant helper for the frontend.
 */
export const ARRAY_SIZES = {
  [SCHEME_TYPES.bfv]: {
    [POLYMODULUS_DEGREES.BITS_1024]: 512,
    [POLYMODULUS_DEGREES.BITS_2048]: 1024,
    [POLYMODULUS_DEGREES.BITS_4096]: 2048,
    [POLYMODULUS_DEGREES.BITS_8192]: 4096,
    [POLYMODULUS_DEGREES.BITS_16384]: 8192,
    [POLYMODULUS_DEGREES.BITS_32768]: 16384
  },
  [SCHEME_TYPES.bgv]: {
    [POLYMODULUS_DEGREES.BITS_1024]: 512,
    [POLYMODULUS_DEGREES.BITS_2048]: 1024,
    [POLYMODULUS_DEGREES.BITS_4096]: 2048,
    [POLYMODULUS_DEGREES.BITS_8192]: 4096,
    [POLYMODULUS_DEGREES.BITS_16384]: 8192,
    [POLYMODULUS_DEGREES.BITS_32768]: 16384
  },
  [SCHEME_TYPES.ckks]: {
    [POLYMODULUS_DEGREES.BITS_1024]: 1024,
    [POLYMODULUS_DEGREES.BITS_2048]: 2048,
    [POLYMODULUS_DEGREES.BITS_4096]: 4096,
    [POLYMODULUS_DEGREES.BITS_8192]: 8192,
    [POLYMODULUS_DEGREES.BITS_16384]: 16384,
    [POLYMODULUS_DEGREES.BITS_32768]: 32768
  }
}

export const ACTION_STATUS = {
  SUCCESS: 'Success',
  FAILURE: 'Failure',
  UNKNOWN: 'Unknown'
}

export const KEY_TYPES = {
  SECRET: 'secret',
  PUBLIC: 'public',
  RELIN: 'relin',
  GALOIS: 'galois'
}

export const getValidKeyType = type => {
  if (Object.prototype.hasOwnProperty.call(KEY_TYPES, type.toUpperCase())) {
    return KEY_TYPES[type.toUpperCase()]
  }
  return undefined
}

// Mapping from Frontend to the Backend API calls
export const BACKEND_SCHEME_TYPES = {
  none: 'none',
  bfv: 'bfv',
  bgv: 'bgv',
  ckks: 'ckks'
}

export const BACKEND_SECURITY_LEVELS = {
  none: 'none',
  BITS_128: 128,
  BITS_192: 192,
  BITS_256: 256
}

export const BACKEND_POLYMODULUS_DEGREES = {
  BITS_2: 2,
  BITS_4: 4,
  BITS_8: 8,
  BITS_16: 16,
  BITS_32: 32,
  BITS_64: 64,
  BITS_128: 128,
  BITS_256: 256,
  BITS_512: 512,
  BITS_1024: 1024,
  BITS_2048: 2048,
  BITS_4096: 4096,
  BITS_8192: 8192,
  BITS_16384: 16384,
  BITS_32768: 32768
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

export const getBackendSchemeType = key => {
  const frontend = getKeyByValue(SCHEME_TYPES, key)
  if (Object.prototype.hasOwnProperty.call(BACKEND_SCHEME_TYPES, frontend)) {
    return BACKEND_SCHEME_TYPES[frontend]
  }
  throw new Error('Invalid Backend Scheme Type')
}

export const getBackendSecurityLevel = key => {
  const frontend = getKeyByValue(SECURITY_LEVELS, key)
  if (Object.prototype.hasOwnProperty.call(BACKEND_SECURITY_LEVELS, frontend)) {
    return BACKEND_SECURITY_LEVELS[frontend]
  }
  throw new Error('Invalid Backend Security Level')
}
export const getBackendPolyModulusDegree = key => {
  const frontend = getKeyByValue(POLYMODULUS_DEGREES, key)
  if (Object.prototype.hasOwnProperty.call(BACKEND_POLYMODULUS_DEGREES, frontend)) {
    return BACKEND_POLYMODULUS_DEGREES[frontend]
  }
  throw new Error('Invalid Backend PolyModulusDegree')
}

export const getFrontendSchemeType = key => {
  const frontend = getKeyByValue(BACKEND_SCHEME_TYPES, key)
  if (Object.prototype.hasOwnProperty.call(SCHEME_TYPES, frontend)) {
    return SCHEME_TYPES[frontend]
  }
  throw new Error('Invalid Frontend Scheme Type')
}

export const getFrontendSecurityLevel = key => {
  const frontend = getKeyByValue(BACKEND_SECURITY_LEVELS, key)
  if (Object.prototype.hasOwnProperty.call(SECURITY_LEVELS, frontend)) {
    return SECURITY_LEVELS[frontend]
  }
  throw new Error('Invalid Frontend Security Level')
}
export const getFrontendPolyModulusDegree = key => {
  const frontend = getKeyByValue(BACKEND_POLYMODULUS_DEGREES, key)
  if (Object.prototype.hasOwnProperty.call(POLYMODULUS_DEGREES, frontend)) {
    return POLYMODULUS_DEGREES[frontend]
  }
  throw new Error('Invalid Frontend PolyModulusDegree')
}

export const VARIABLE_TYPES = {
  PLAIN: 'plain',
  CIPHER: 'cipher'
}

export const getVariableType = key => {
  if (Object.prototype.hasOwnProperty.call(VARIABLE_TYPES, key.toUpperCase())) {
    return VARIABLE_TYPES[key.toUpperCase()]
  }
  throw new Error('Invalid Variable Type')
}

export const ARG_TYPES = {
  DATA: 'data',
  SCALE: 'scale',
  EXPONENT: 'exponent',
  STEPS: 'steps',
  PLAIN_TEXT: 'plain',
  CIPHER_TEXT: 'cipher'
}
