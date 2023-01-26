import shortid from 'shortid'
import { SCHEME_TYPES } from 'shared/constants'
import config from 'config'

const schemeTypes = {
  [SCHEME_TYPES.none]: 'seal.SchemeType.none',
  [SCHEME_TYPES.bfv]: 'seal.SchemeType.bfv',
  [SCHEME_TYPES.bgv]: 'seal.SchemeType.bgv',
  [SCHEME_TYPES.ckks]: 'seal.SchemeType.ckks'
}

const securityLevels = {
  none: 'seal.SecurityLevel.none',
  128: 'seal.SecurityLevel.tc128',
  192: 'seal.SecurityLevel.tc192',
  256: 'seal.SecurityLevel.tc256'
}

const polyModulusDegrees = {
  1024: 1024,
  2048: 2048,
  4096: 4096,
  8192: 8192,
  16384: 16384,
  32768: 32768
}

const replaceWithUnderscores = string => {
  return string.replace(/[\W]+/g, '_')
}

const ACTION_METHODS = {
  BATCH_ENCODE_INT32: ({ plainTexts, array, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    const arr = array.toString()
    return `
    // Encode data to a PlainText
    encoder.encode(
      Int32Array.from([${arr}]),
      ${pName}
    )
    `
  },
  CKKS_ENCODE_FLOAT64: ({ plainTexts, array, scale, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    const arr = array.toString()
    return `
    // Encode data to a PlainText
    encoder.encode(
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
    const destination_${pName} = encoder.decode(
      ${pName}
    )
    console.log('decoded', destination_${pName} )
    `
  },
  CKKS_DECODE_FLOAT64: ({ plainTexts, id }) => {
    const randId = shortid()
    const pName = replaceWithUnderscores(plainTexts.byId[id] ? plainTexts.byId[id].name : randId)
    return `
    // Decode data from a PlainText
    const destination_${pName} = encoder.decode(
      ${pName}
    )
    console.log('decoded', destination_${pName} )
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
  }
}

const getSchemeType = scheme => {
  if (schemeTypes.hasOwnProperty(scheme)) {
    return schemeTypes[scheme]
  }
  throw new Error('Unsupported SchemeType!')
}

const getSecurityLevel = level => {
  if (securityLevels.hasOwnProperty(level)) {
    return securityLevels[level]
  }
  throw new Error('Unsupported SecurityLevel!')
}

const getPolyModulusDegree = degree => {
  if (polyModulusDegrees.hasOwnProperty(degree)) {
    return polyModulusDegrees[degree]
  }
  throw new Error('Unsupported PolyModulusDegree!')
}

export const genClientCode = props => {
  const {
    api,
    encParm,
    secretKey,
    variables,
    constants: { ARG_TYPES, SCHEME_TYPES }
  } = props

  const plainInOrder = variables.allIds
    .map(x => variables.byId[x])
    .filter(x => x.type === ARG_TYPES.CIPHER_TEXT)
    .filter(x => x.private === false)
    .map(x => ({
      ...x,
      name: x.name.replace(/[\W]+/g, '_') + '_plain'
    }))
  const cipherInOrder = variables.allIds
    .map(x => variables.byId[x])
    .filter(x => x.type === ARG_TYPES.CIPHER_TEXT)
    .filter(x => x.private === false)
    .map(x => ({
      ...x,
      name: x.name.replace(/[\W]+/g, '_') + '_cipher'
    }))

  const code = []
  code.push(`(async () => {
    // Install deps for this file
    // npm install node-seal request request-promise
    // yarn add node-seal request request-promise
    //
    // ES6 or CommonJS
    // import SEAL from 'node-seal'
    const SEAL = require('node-seal')
    const rp = require('request-promise')
    
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
    const bitSizes = [${encParm.coeffModulusBitSizes.toString()}]
    const bitSize = ${parseInt(encParm.plainModulusBitSize, 10)}
    const expandModChain =  ${encParm.expandModChain}
    
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
      expandModChain,
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

  const publicKey = api.publicKeyUuid

  // Generate optional code for copy/pasting a secret key
  code.push(`
    // *************************************
    const base64SecretKey = '${secretKey}'
    // *************************************
    
    // Create an Empty SecretKey to load
    const secretKey = seal.SecretKey()
    // Load from the base64 encoded string
    secretKey.load(context, base64SecretKey)
    `)

  code.push(`
    // Creating a new KeyGenerator can be expensive and may not always be necessary.
    // Instead, you may also create any Key (Public, Relin, Galois) in the same way as the 
    // SecretKey was created above and avoid creating a KeyGenerator altogether if you've
    // managed to save them somewhere.
    //
    // For the sake of this example, we will re-create all necessary keys
    // on the client-side for simplicity. To do that, we need to create
    // a KeyGenerator with the previously copy/pasted SecretKey
    const keyGenerator = seal.KeyGenerator(
      context,
      secretKey
    )
    `)

  if (publicKey) {
    code.push(`
    // Get the new PublicKey from the keyGenerator
    const publicKey = keyGenerator.createPublicKey()
    `)
  }

  code.push(`
    ////////////////////////
    // Variables
    ////////////////////////
    
    `)

  if (Object.keys(plainInOrder).length > 0) {
    code.push(`
    // For this example, we are creating PlainTexts corresponding to the 
    // CipherText(s) with 'private' set to false.
    //
    // Create the PlainText(s) 
    `)
    plainInOrder.forEach(x => {
      if (!x.private) {
        code.push(`const ${x.name} = seal.PlainText()
    `)
      }
    })
  }

  if (Object.keys(cipherInOrder).length > 0) {
    code.push(`
    // Create the CipherText(s) 
    `)
    cipherInOrder.forEach(x => {
      if (!x.private) {
        code.push(`const ${x.name} = seal.CipherText()
    `)
      }
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
    const encoder = seal.BatchEncoder(context)
    `)
  }

  if (encParm.schemeType === SCHEME_TYPES.ckks) {
    code.push(`
    // Create a CkksEncoder (only ckks SchemeType)
    const encoder = seal.CKKSEncoder(context)
    `)
  }

  code.push(`
    // Create an Encryptor
    const encryptor = seal.Encryptor(
      context,
      publicKey
    )
    `)

  code.push(`
    // Create a Decryptor
    const decryptor = seal.Decryptor(
      context,
      secretKey
    )
    `)

  code.push(`
    ////////////////////////
    // Homomorphic Functions
    ////////////////////////
    `)

  const pById = plainInOrder.reduce((byId, item) => {
    byId[item.uuid] = item
    return byId
  }, {})
  const plainTexts = {
    allIds: [...Object.keys(pById)],
    byId: { ...pById }
  }

  const cById = cipherInOrder.reduce((byId, item) => {
    byId[item.uuid] = item
    return byId
  }, {})
  const cipherTexts = {
    allIds: [...Object.keys(cById)],
    byId: { ...cById }
  }

  plainInOrder.forEach(x => {
    if (encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv) {
      code.push(ACTION_METHODS.BATCH_ENCODE_INT32({ plainTexts, array: x.data, id: x.uuid }))
    }
    if (encParm.schemeType === SCHEME_TYPES.ckks) {
      code.push(ACTION_METHODS.CKKS_ENCODE_FLOAT64({ plainTexts, array: x.data, scale: x.scale, id: x.uuid }))
    }
  })

  cipherInOrder.forEach((x, i) => {
    code.push(
      ACTION_METHODS.ENCRYPT({
        plainTexts,
        cipherTexts,
        plainTextId: plainInOrder[i].uuid,
        cipherTextId: x.uuid
      })
    )
  })

  code.push(`
    ////////////////////////
    // Build API Request 
    ////////////////////////
    
    const response = await rp({
      uri: '${config.ENGINE_HOST}/v1/compute',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      body: {
        route: {
          hash: '${api.hash}'
        },
        variables: [`)

  cipherInOrder.forEach((x, i) => {
    code.push(`
          {
            uuid: '${x.uuid}',
            encoded: ${x.name}.save()
          }${i === cipherInOrder.length - 1 ? '' : ','}`)
  })

  code.push(`
        ]
      }
    })
    `)

  code.push(`
    // Iterate through the response, decrypt each returned ciphertext, then decode and print to console
    const { result } = response
    result.forEach(x => {
    
      // Create temp CipherText to hold the encoded result
      const cipherResult = seal.CipherText()
      cipherResult.load(context, x.encoded)

      // Decrypt to the temp PlainText
      const plainResult = decryptor.decrypt(cipherResult)
      
      // Create a temporary vector to store the decoded PlainText
      const decodedResult = encoder.decode(plainResult)
      
      console.log(\`Variable (\${x.name})'s first few elements:\`, decodedResult.slice(0, 10)${
        encParm.schemeType === SCHEME_TYPES.ckks ? '.map(x => x.toFixed(3))' : ''
      }.toString())

      // Cleanup the temp variables due to prevent memory leak (Lack of JS / C++ finalizers)
      cipherResult.delete()
      plainResult.delete()
    })
    `)

  code.push(`
})()
`)
  return {
    codeOpen: true,
    code
  }
}
