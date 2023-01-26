import shortid from 'shortid'
import { SCHEME_TYPES, SECURITY_LEVELS, POLYMODULUS_DEGREES } from 'shared/constants'

const schemeTypes = {
  [SCHEME_TYPES.none]: 'seal.SchemeType.none',
  [SCHEME_TYPES.bfv]: 'seal.SchemeType.bfv',
  [SCHEME_TYPES.bgv]: 'seal.SchemeType.bgv',
  [SCHEME_TYPES.ckks]: 'seal.SchemeType.ckks'
}

const securityLevels = {
  [SECURITY_LEVELS.none]: 'seal.SecurityLevel.none',
  [SECURITY_LEVELS.BITS_128]: 'seal.SecurityLevel.tc128',
  [SECURITY_LEVELS.BITS_192]: 'seal.SecurityLevel.tc192',
  [SECURITY_LEVELS.BITS_256]: 'seal.SecurityLevel.tc256'
}

const polyModulusDegrees = {
  [POLYMODULUS_DEGREES.BITS_1024]: 1024,
  [POLYMODULUS_DEGREES.BITS_2048]: 2048,
  [POLYMODULUS_DEGREES.BITS_4096]: 4096,
  [POLYMODULUS_DEGREES.BITS_8192]: 8192,
  [POLYMODULUS_DEGREES.BITS_16384]: 16384,
  [POLYMODULUS_DEGREES.BITS_32768]: 32768
}

const replaceWithUnderscores = string => {
  return string.replace(/[\W]+/g, '_')
}

const ACTION_METHODS = {
  BATCH_ENCODE_INT32: ({ plainTexts, array, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    const arr = array.split(',').map(x => Number(x))
    return `
    // Encode data to a PlainText
    batchEncoder.encode(
      Int32Array.from([${arr}]),
      ${pName}
    )
    `
  },
  BATCH_ENCODE_UINT32: ({ plainTexts, array, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    const arr = array.split(',').map(x => Number(x))
    return `
    // Encode data to a PlainText
    batchEncoder.encode(
      Uint32Array.from([${arr}]),
      ${pName}
    )
    `
  },
  CKKS_ENCODE_FLOAT64: ({ plainTexts, array, scale, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    const arr = array.split(',').map(x => Number(x))
    return `
    // Encode data to a PlainText
    ckksEncoder.encode(
      Float64Array.from([${arr}]),
      Math.pow(2, ${scale}),
      ${pName}
    )
    `
  },
  BATCH_DECODE_INT32: ({ plainTexts, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    return `
    // Decode data from a PlainText
    const decoded_${pName} = batchEncoder.decode(
      ${pName}
    )
    
    console.log('decoded', decoded_${pName} )
    `
  },
  BATCH_DECODE_UINT32: ({ plainTexts, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    return `
    // Decode data from a PlainText
    const decoded_${pName} = batchEncoder.decode(
      ${pName},
      false
    )
    
    console.log('decoded', decoded_${pName} )
    `
  },
  CKKS_DECODE_FLOAT64: ({ plainTexts, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    return `
    // Decode data from a PlainText
    const decoded_${pName} = ckksEncoder.decode(
      ${pName},
    )
    
    console.log('decoded', decoded_${pName} )
    `
  },
  ENCRYPT: ({ plainTexts, cipherTexts, plainTextId, cipherTextId }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[plainTextId] ? plainTexts.byId[plainTextId].name : randId)
    const cName = replaceWithUnderscores(cipherTexts.byId[cipherTextId] ? cipherTexts.byId[cipherTextId].name : randId)
    return `
    // Encrypt a PlainText
    encryptor.encrypt(
      ${pName},
      ${cName}
    )    
    `
  },
  DECRYPT: ({ plainTexts, cipherTexts, plainTextId, cipherTextId }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[plainTextId] ? plainTexts.byId[plainTextId].name : randId)
    const cName = replaceWithUnderscores(cipherTexts.byId[cipherTextId] ? cipherTexts.byId[cipherTextId].name : randId)
    return `
    // Decrypt a CipherText
    decryptor.decrypt(
      ${cName},
      ${pName}
    )    
    `
  },
  ADD_CIPHER_TO_CIPHER: ({ cipherTexts, cipherTextIdA, cipherTextIdB, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameB = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdB] ? cipherTexts.byId[cipherTextIdB].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Add CipherText B to CipherText A and store the sum in a destination CipherText
    evaluator.add(
      ${cNameA},
      ${cNameB},
      ${cNameD}
    )    
    `
  },
  ADD_PLAIN_TO_CIPHER: ({ plainTexts, cipherTexts, cipherTextIdA, plainTextIdB, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const pNameB = replaceWithUnderscores(plainTexts.byId[plainTextIdB] ? plainTexts.byId[plainTextIdB].name : randId)
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Add a PlainText B to a CipherText A and store the sum in a destination CipherText
    evaluator.addPlain(
      ${cNameA},
      ${pNameB},
      ${cNameD}
    }    
    `
  },
  SUB_CIPHER_FROM_CIPHER: ({ cipherTexts, cipherTextIdA, cipherTextIdB, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameB = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdB] ? cipherTexts.byId[cipherTextIdB].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Subtract CipherText B from CipherText A and store the difference in a destination CipherText
    evaluator.sub(
      ${cNameA},
      ${cNameB},
      ${cNameD}
    )  
    `
  },
  SUB_PLAIN_FROM_CIPHER: ({ plainTexts, cipherTexts, cipherTextIdA, plainTextIdB, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const pNameB = replaceWithUnderscores(plainTexts.byId[plainTextIdB] ? plainTexts.byId[plainTextIdB].name : randId)
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Subtract a PlainText B from a CipherText A and store the difference in a destination CipherText
    evaluator.subPlain(
      ${cNameA},
      ${pNameB},
      ${cNameD}
    }    
    `
  },
  MULTIPLY_CIPHER_BY_CIPHER: ({ cipherTexts, cipherTextIdA, cipherTextIdB, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameB = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdB] ? cipherTexts.byId[cipherTextIdB].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Multiply CipherText A by CipherText B and store the product in a destination CipherText
    evaluator.multiply(
      ${cNameA},
      ${cNameB},
      ${cNameD}
    )  
    `
  },
  MULTIPLY_CIPHER_BY_PLAIN: ({ plainTexts, cipherTexts, cipherTextIdA, plainTextIdB, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const pNameB = replaceWithUnderscores(plainTexts.byId[plainTextIdB] ? plainTexts.byId[plainTextIdB].name : randId)
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Multiply CipherText A by PlainText B and store the product in a destination CipherText
    evaluator.multiplyPlain(
      ${cNameA},
      ${pNameB},
      ${cNameD}
    }    
    `
  },
  NEGATE_CIPHER: ({ cipherTexts, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Negate CipherText A and store the result in a destination CipherText
    evaluator.negate(
      ${cNameA},
      ${cNameD}
    )   
    `
  },
  SQUARE_CIPHER: ({ cipherTexts, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Square CipherText A and store the result in a destination CipherText
    evaluator.square(
      ${cNameA},
      ${cNameD}
    )   
    `
  },
  RELINEARIZE_CIPHER: ({ cipherTexts, relinKeys, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const rNameB = replaceWithUnderscores(
      relinKeys.byId[relinKeys.activeId] ? relinKeys.byId[relinKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Relinearize CipherText A and store the result in a destination CipherText
    evaluator.relinearize(
      ${cNameA},
      ${rNameB},
      ${cNameD}
    )    
    `
  },
  BATCH_EXPONENITATE_CIPHER: ({ cipherTexts, relinKeys, cipherTextIdA, exponent, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const rNameB = replaceWithUnderscores(
      relinKeys.byId[relinKeys.activeId] ? relinKeys.byId[relinKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Exponentiate CipherText A by an unsigned integer value 'exponent' and store the result in a destination CipherText
    evaluator.exponentiate(
      ${cNameA},
      ${exponent},
      ${rNameB},
      ${cNameD}
    )    
    `
  },
  CIPHER_MODULUS_SWITCH_TO_NEXT: ({ cipherTexts, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Switch to the next modulus of CipherText A and store the result in a destination CipherText
    evaluator.cipherModSwitchToNext(
      ${cNameA},
      ${cNameD}
    )   
    `
  },
  PLAIN_MODULUS_SWITCH_TO_NEXT: ({ plainTexts, plainTextIdA, plainTextIdDestination }) => {
    const randId = shortid()
    const pNameA = replaceWithUnderscores(plainTexts.byId[plainTextIdA] ? plainTexts.byId[plainTextIdA].name : randId)
    const pNameD = replaceWithUnderscores(
      plainTexts.byId[plainTextIdDestination] ? plainTexts.byId[plainTextIdDestination].name : randId
    )
    return `
    // Switch to the next modulus of PlainText A and store the result in a destination PlainText
    evaluator.plainModSwitchToNext(
      ${pNameA},
      ${pNameD}
    )    
    `
  },
  CKKS_CIPHER_RESCALE_TO_NEXT: ({ cipherTexts, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Rescale CipherText A to size 2 and store the result in a destination CipherText
    evaluator.rescaleToNext(
      ${cNameA},
      ${cNameD}
    )   
    `
  },
  CIPHER_TRANSFORM_TO_NTT: ({ cipherTexts, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Transform CipherText A to the NTT domain and store the result in a destination CipherText
    evaluator.cipherTransformToNtt(
      ${cNameA},
      ${cNameD}
    )    
    `
  },
  CIPHER_TRANSFORM_FROM_NTT: ({ cipherTexts, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Transform CipherText A from the NTT domain and store the result in a destination CipherText
    evaluator.cipherTransformFromNtt(
      ${cNameA},
      ${cNameD}
    )    
    `
  },
  BATCH_ROTATE_ROWS: ({ cipherTexts, galoisKeys, cipherTextIdA, steps, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const gName = replaceWithUnderscores(
      galoisKeys.byId[galoisKeys.activeId] ? galoisKeys.byId[galoisKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Rotate a CipherText's rows by an integer value of 'steps' and store the result in a destination CipherText
    evaluator.rotateRows(
      ${cNameA},
      ${steps},
      ${gName},
      ${cNameD}
    )    
    `
  },
  BATCH_ROTATE_COLUMNS: ({ cipherTexts, galoisKeys, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const gName = replaceWithUnderscores(
      galoisKeys.byId[galoisKeys.activeId] ? galoisKeys.byId[galoisKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Rotate a CipherText's columns and store the result in a destination CipherText
    evaluator.rotateColumns(
      ${cNameA},
      ${gName},
      ${cNameD}
    )    
    `
  },
  CKKS_ROTATE_VECTOR: ({ cipherTexts, galoisKeys, cipherTextIdA, steps, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const gName = replaceWithUnderscores(
      galoisKeys.byId[galoisKeys.activeId] ? galoisKeys.byId[galoisKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Rotate a CipherText's vector by an integer value of 'steps' and store the result in a destination CipherText
    evaluator.rotateVector(
      ${cNameA},
      ${steps},
      ${gName},
      ${cNameD}
    )    
    `
  },
  CKKS_COMPLEX_CONJUGATE: ({ cipherTexts, galoisKeys, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const gName = replaceWithUnderscores(
      galoisKeys.byId[galoisKeys.activeId] ? galoisKeys.byId[galoisKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Perform a Complex Conjugate on a CipherText and store the result in a destination CipherText
    evaluator.complexConjugate(
      ${cNameA},
      ${gName},
      ${cNameD}
    )    
    `
  },
  SUM_ELEMENTS: ({ encParm, cipherTexts, galoisKeys, cipherTextIdA, cipherTextIdDestination }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const gName = replaceWithUnderscores(
      galoisKeys.byId[galoisKeys.activeId] ? galoisKeys.byId[galoisKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Sum all elements of a CipherText and store the result in a destination CipherText
    evaluator.sumElements(
      ${cNameA},
      ${gName},
      ${getSchemeType(encParm.schemeType)},
      ${cNameD}
    )    
    `
  },
  DOT_PRODUCT: ({
    encParm,
    cipherTexts,
    relinKeys,
    galoisKeys,
    cipherTextIdA,
    cipherTextIdB,
    cipherTextIdDestination
  }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const cNameB = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdB] ? cipherTexts.byId[cipherTextIdB].name : randId
    )
    const rName = replaceWithUnderscores(
      relinKeys.byId[relinKeys.activeId] ? relinKeys.byId[relinKeys.activeId].name : randId
    )
    const gName = replaceWithUnderscores(
      galoisKeys.byId[galoisKeys.activeId] ? galoisKeys.byId[galoisKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Perform a Dot Product on two CipherTexts and store the result in a destination CipherText
    evaluator.dotProduct(
      ${cNameA},
      ${cNameB},
      ${rName},
      ${gName},
      ${getSchemeType(encParm.schemeType)},
      ${cNameD}
    )    
    `
  },
  DOT_PRODUCT_PLAIN: ({
    encParm,
    cipherTexts,
    plainTexts,
    relinKeys,
    galoisKeys,
    cipherTextIdA,
    plainTextIdB,
    cipherTextIdDestination
  }) => {
    const randId = shortid()
    const cNameA = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdA] ? cipherTexts.byId[cipherTextIdA].name : randId
    )
    const pNameB = replaceWithUnderscores(plainTexts.byId[plainTextIdB] ? plainTexts.byId[plainTextIdB].name : randId)
    const rName = replaceWithUnderscores(
      relinKeys.byId[relinKeys.activeId] ? relinKeys.byId[relinKeys.activeId].name : randId
    )
    const gName = replaceWithUnderscores(
      galoisKeys.byId[galoisKeys.activeId] ? galoisKeys.byId[galoisKeys.activeId].name : randId
    )
    const cNameD = replaceWithUnderscores(
      cipherTexts.byId[cipherTextIdDestination] ? cipherTexts.byId[cipherTextIdDestination].name : randId
    )
    return `
    // Perform a Dot Product on a CipherText and a PlainText and store the result in a destination CipherText
    evaluator.dotProductPlain(
      ${cNameA},
      ${pNameB},
      ${rName},
      ${gName},
      ${getSchemeType(encParm.schemeType)},
      ${cNameD}
    )    
    `
  }
}

const getSchemeType = scheme => {
  // eslint-disable-next-line no-prototype-builtins
  if (schemeTypes.hasOwnProperty(scheme)) {
    return schemeTypes[scheme]
  }
  throw new Error('Unsupported SchemeType!')
}

const getSecurityLevel = level => {
  // eslint-disable-next-line no-prototype-builtins
  if (securityLevels.hasOwnProperty(level)) {
    return securityLevels[level]
  }
  throw new Error('Unsupported SecurityLevel!')
}

const getPolyModulusDegree = degree => {
  // eslint-disable-next-line no-prototype-builtins
  if (polyModulusDegrees.hasOwnProperty(degree)) {
    return polyModulusDegrees[degree]
  }
  throw new Error('Unsupported PolyModulusDegree!')
}

export const genCode = props => {
  const {
    encParm,
    secretKeys,
    publicKeys,
    relinKeys,
    galoisKeys,
    plainTexts,
    cipherTexts,
    actionsAllIds,
    actionsById,
    constants: { SCHEME_TYPES }
  } = props

  const plainInOrder = plainTexts.allIds.map(x => plainTexts.byId[x])
  const cipherInOrder = cipherTexts.allIds.map(x => cipherTexts.byId[x])
  const actionsInOrder = actionsAllIds.map(x => actionsById[x])

  const code = []
  code.push(`(async () => {
    // Pick one for your environment
    // npm install node-seal
    // yarn add node-seal
    //
    // ES6 or CommonJS
    // import SEAL from 'node-seal'
    const SEAL = require('node-seal')
    
    // Wait for the web assembly to fully initialize
    const seal = await SEAL()
    `)

  code.push(`
    ////////////////////////
    // Encryption Parameters
    ////////////////////////
    `)
  code.push(`
    // Create a new EncryptionParameters
    const schemeType = ${getSchemeType(encParm.schemeType)}
    const securityLevel = ${getSecurityLevel(encParm.securityLevel)}
    const polyModulusDegree = ${getPolyModulusDegree(encParm.polyModulusDegree)}
    const bitSizes = [${encParm.bitSizes.split(',').map(x => parseInt(x, 10))}]${
    encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv
      ? '\n    const bitSize = ' + parseInt(encParm.bitSize, 10)
      : ''
  }
    
    const encParms = seal.EncryptionParameters(schemeType)

    // Assign Poly Modulus Degree
    encParms.setPolyModulusDegree(polyModulusDegree)
    
    // Create a suitable set of CoeffModulus primes
    encParms.setCoeffModulus(
      seal.CoeffModulus.Create(
        polyModulusDegree,
        Int32Array.from(bitSizes)
      )
    )
`)

  if (encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv) {
    // Set the PlainModulus and bitSize.
    code.push(`
    // Assign a PlainModulus (only for bfv/bgv scheme type)
    encParms.setPlainModulus(
      seal.PlainModulus.Batching(
        polyModulusDegree,
        bitSize
      )
    )
`)
  }

  code.push(`
    ////////////////////////
    // Context
    ////////////////////////
    `)
  code.push(`
    // Create a new Context
    const context = seal.Context(
      encParms,
      ${encParm.expandModChain},
      securityLevel
    )

    // Helper to check if the Context was created successfully
    if (!context.parametersSet()) {
      throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.')
    }
`)

  code.push(`
    ////////////////////////
    // Keys
    ////////////////////////
    `)

  let sKey = null
  let sKeyUploaded = false

  if (secretKeys.activeId) {
    sKeyUploaded = secretKeys.byId[secretKeys.activeId].uploaded
    sKey = secretKeys.byId[secretKeys.activeId].name.replace(/[\W]+/g, '_')
    if (sKeyUploaded) {
      code.push(`
    // Uploading a SecretKey: first, create an Empty SecretKey to load
    const ${sKey} = seal.SecretKey()
    // Load from the base64 encoded string
    ${sKey}.load(context, <(base64 string)>)
`)
    }
  }

  let pKey = null
  let pKeyUploaded = false

  if (publicKeys.activeId) {
    pKeyUploaded = publicKeys.byId[publicKeys.activeId].uploaded
    pKey = publicKeys.byId[publicKeys.activeId].name.replace(/[\W]+/g, '_')
    if (pKeyUploaded) {
      code.push(`
    // Uploading a PublicKey: first, create an Empty PublicKey to load
    const ${pKey} = seal.PublicKey()
    // Load from the base64 encoded string
    ${pKey}.load(context, <(base64 string)>)
`)
    }
  }

  code.push(`
    // Create a new KeyGenerator (use uploaded keys if applicable)
    const keyGenerator = seal.KeyGenerator(
      context${sKeyUploaded ? ',\n      ' + sKey : ''}${pKeyUploaded ? ',\n      ' + pKey : ''}
    )
`)
  if (secretKeys.activeId && !sKeyUploaded) {
    code.push(`
    // Get the SecretKey from the keyGenerator
    const ${sKey} = keyGenerator.secretKey()
`)
  }
  if (publicKeys.activeId && !pKeyUploaded) {
    code.push(`
    // Get the PublicKey from the keyGenerator
    const ${pKey} = keyGenerator.createPublicKey()
`)
  }

  let rKey = null
  if (relinKeys.activeId) {
    rKey = relinKeys.byId[relinKeys.activeId].name.replace(/[\W]+/g, '_')

    if (relinKeys.byId[relinKeys.activeId].uploaded) {
      code.push(`
    // Uploading a RelinKey: first, create an Empty RelinKey to load
    const ${rKey} = seal.RelinKey()
    // Load from the base64 encoded string
    ${rKey}.load(context, <(base64 string)>)
`)
    } else {
      code.push(`
    // Create a new RelinKey
    const ${rKey} = keyGenerator.createRelinKeys()
`)
    }
  }

  let gKey = null
  if (galoisKeys.activeId) {
    gKey = galoisKeys.byId[galoisKeys.activeId].name.replace(/[\W]+/g, '_')

    if (galoisKeys.byId[galoisKeys.activeId].uploaded) {
      code.push(`
    // Uploading a GaloisKey: first, create an Empty GaloisKey to load
    const ${gKey} = seal.GaloisKey()
    // Load from the base64 encoded string
    ${gKey}.load(context, <(base64 string)>)
`)
    } else {
      code.push(`
    // Create a new GaloisKey
    const ${gKey} = keyGenerator.createGaloisKeys()
`)
    }
  }

  code.push(`
    ////////////////////////
    // Variables
    ////////////////////////
    `)
  if (plainTexts.allIds.length > 0) {
    code.push(`
    // Create the PlainText(s) 
    `)
    plainInOrder.forEach(x => {
      code.push(`const ${x.name.replace(/[\W]+/g, '_')} = seal.PlainText()
`)
    })
  }

  if (cipherTexts.allIds.length > 0) {
    code.push(`
    // Create the CipherText(s) 
    `)
    cipherInOrder.forEach(x => {
      code.push(`const ${x.name.replace(/[\W]+/g, '_')} = seal.CipherText()
`)
    })
  }

  code.push(`
    ////////////////////////
    // Instances
    ////////////////////////
    `)
  code.push(`
    // Create an Evaluator
    const evaluator = seal.Evaluator(context)
`)

  if (encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv) {
    code.push(`
    // Create a BatchEncoder (only bfv/bgv SchemeType)
    const batchEncoder = seal.BatchEncoder(context)
`)
  }

  if (encParm.schemeType === SCHEME_TYPES.ckks) {
    code.push(`
    // Create a CkksEncoder (only ckks SchemeType)
    const ckksEncoder = seal.CKKSEncoder(context)
`)
  }

  if (publicKeys.activeId) {
    code.push(`
    // Create an Encryptor
    const encryptor = seal.Encryptor(
      context,
      ${pKey}
    )
`)
  }

  if (secretKeys.activeId) {
    code.push(`
    // Create a Decryptor
    const decryptor = seal.Decryptor(
      context,
      ${sKey}
    )
`)
  }

  if (actionsInOrder.length > 0) {
    code.push(`
    ////////////////////////
    // Homomorphic Functions
    ////////////////////////
    `)

    actionsInOrder.forEach(x => {
      const method = ACTION_METHODS[x.type]({
        encParm,
        plainTexts,
        cipherTexts,
        relinKeys,
        galoisKeys,
        ...x.function.payload
      })
      code.push(method)
    })
  }

  code.push(`
})()
`)
  return {
    codeOpen: true,
    code
  }
}
