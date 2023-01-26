import SEAL from 'node-seal'

import {
  MORFIX_CREATE_ENC_PARMS_REQUEST,
  MORFIX_CREATE_CONTEXT_REQUEST,
  MORFIX_CREATE_KEY_GENERATOR_REQUEST,
  MORFIX_DELETE_PUBLIC_KEY_REQUEST,
  MORFIX_DELETE_SECRET_KEY_REQUEST,
  MORFIX_DELETE_RELIN_KEY_REQUEST,
  MORFIX_DELETE_GALOIS_KEY_REQUEST,
  MORFIX_GENERATE_PUBLIC_KEY_REQUEST,
  MORFIX_GENERATE_SECRET_KEY_REQUEST,
  MORFIX_GENERATE_RELIN_KEY_REQUEST,
  MORFIX_GENERATE_GALOIS_KEY_REQUEST,
  MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_DOWNLOAD_SECRET_KEY_REQUEST,
  MORFIX_DOWNLOAD_RELIN_KEY_REQUEST,
  MORFIX_DOWNLOAD_GALOIS_KEY_REQUEST,
  MORFIX_UPLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_UPLOAD_SECRET_KEY_REQUEST,
  MORFIX_UPLOAD_RELIN_KEY_REQUEST,
  MORFIX_UPLOAD_GALOIS_KEY_REQUEST,
  MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST,
  MORFIX_SET_ACTIVE_GALOIS_KEY_REQUEST,
  MORFIX_CREATE_BATCH_ENCODER_REQUEST,
  MORFIX_CREATE_CKKS_ENCODER_REQUEST,
  MORFIX_CREATE_ENCRYPTOR_REQUEST,
  MORFIX_CREATE_DECRYPTOR_REQUEST,
  MORFIX_DELETE_ENCRYPTOR_REQUEST,
  MORFIX_DELETE_DECRYPTOR_REQUEST,
  MORFIX_CREATE_EVALUATOR_REQUEST,
  MORFIX_BATCH_ENCODE_INT32_REQUEST,
  MORFIX_BATCH_ENCODE_UINT32_REQUEST,
  MORFIX_CKKS_ENCODE_FLOAT64_REQUEST,
  MORFIX_BATCH_DECODE_INT32_REQUEST,
  MORFIX_BATCH_DECODE_UINT32_REQUEST,
  MORFIX_CKKS_DECODE_FLOAT64_REQUEST,
  MORFIX_CREATE_PLAIN_TEXT_REQUEST,
  MORFIX_READ_PLAIN_TEXT_REQUEST,
  MORFIX_DELETE_PLAIN_TEXT_REQUEST,
  MORFIX_DOWNLOAD_PLAIN_TEXT_REQUEST,
  MORFIX_UPLOAD_PLAIN_TEXT_REQUEST,
  MORFIX_LOAD_PLAIN_TEXT_REQUEST,
  MORFIX_CREATE_CIPHER_TEXT_REQUEST,
  MORFIX_READ_CIPHER_TEXT_REQUEST,
  MORFIX_DELETE_CIPHER_TEXT_REQUEST,
  MORFIX_DOWNLOAD_CIPHER_TEXT_REQUEST,
  MORFIX_UPLOAD_CIPHER_TEXT_REQUEST,
  MORFIX_LOAD_CIPHER_TEXT_REQUEST,
  MORFIX_ENCRYPT_REQUEST,
  MORFIX_DECRYPT_REQUEST,
  MORFIX_EVALUATE_NEGATE_CIPHER_REQUEST,
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_REQUEST,
  MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_REQUEST,
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_REQUEST,
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_REQUEST,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_REQUEST,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST,
  MORFIX_EVALUATE_SQUARE_CIPHER_REQUEST,
  MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST,
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_REQUEST,
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_REQUEST,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_REQUEST,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_REQUEST,
  MORFIX_EVALUATE_ROTATE_ROWS_REQUEST,
  MORFIX_EVALUATE_ROTATE_COLUMNS_REQUEST,
  MORFIX_EVALUATE_ROTATE_VECTOR_REQUEST,
  MORFIX_EVALUATE_COMPLEX_CONJUGATE_REQUEST,
  MORFIX_EVALUATE_SUM_ELEMENTS_REQUEST,
  MORFIX_EVALUATE_DOT_PRODUCT_REQUEST,
  MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_REQUEST
} from 'store/constants/morfix'

import { SCHEME_TYPES, SECURITY_LEVELS, POLYMODULUS_DEGREES } from 'shared/constants'

class MyWorker {
  constructor() {
    this.seal = SEAL
    this.morfix = null
    this._version = '1.0.0' // default version
    this._initialized = false

    this._context = null
    this._keyGenerator = null
    this._batchEncoder = null
    this._ckksEncoder = null
    this._encryptor = null
    this._decryptor = null
    this._evaluator = null

    this._keys = {
      public: {
        activeId: '',
        byId: {},
        allIds: []
      },
      secret: {
        activeId: '',
        byId: {},
        allIds: []
      },
      relin: {
        activeId: '',
        byId: {},
        allIds: []
      },
      galois: {
        activeId: '',
        byId: {},
        allIds: []
      }
    }
    this._plainText = {
      byId: {},
      allIds: []
    }
    this._cipherText = {
      byId: {},
      allIds: []
    }

    this.TYPES = {
      PUBLIC: 'PUBLIC KEY',
      SECRET: 'SECRET KEY',
      RELIN: 'RELIN KEY',
      GALOIS: 'GALOIS KEY',
      CIPHER_TEXT: 'CIPHER TEXT',
      PLAIN_TEXT: 'PLAIN TEXT'
    }

    this.handleMessage = this.handleMessage.bind(this)

    this.actions = {
      [MORFIX_CREATE_ENC_PARMS_REQUEST]: this._createAction(async action => {
        try {
          const { payload } = action

          // Remove the previous instance
          this.deleteObject(this._encParms)
          this._encParms = null

          // Create an instance of the parameters
          const parms = this.morfix.EncryptionParameters(this._getSchemeType(payload.schemeType))

          // Assign polymod degree
          parms.setPolyModulusDegree(this._getPolyModulusDegree(payload.polyModulusDegree))
          // Create a suitable set of CoeffModulus primes from the vector
          parms.setCoeffModulus(
            this.morfix.CoeffModulus.Create(
              this._getPolyModulusDegree(payload.polyModulusDegree),
              Int32Array.from(payload.bitSizes.split(',').map(x => parseInt(x, 10)))
            )
          )

          // Assign plainModulus ONLY for bfv/bgv scheme types
          if (payload.schemeType === SCHEME_TYPES.bfv || payload.schemeType === SCHEME_TYPES.bgv) {
            // Set the PlainModulus and bitSize.
            parms.setPlainModulus(
              this.morfix.PlainModulus.Batching(
                this._getPolyModulusDegree(payload.polyModulusDegree),
                parseInt(payload.bitSize, 10)
              )
            )
          }

          this._encParms = parms
          this._expandModChain = payload.expandModChain
          this._securityLevel = payload.securityLevel
          this._rawEncParms = { ...payload }

          // Reset other internal variables
          this.deleteObject(this._context)
          this._context = null
          this.deleteObject(this._keyGenerator)
          this._keyGenerator = null
          this.deleteObject(this._batchEncoder)
          this._batchEncoder = null
          this.deleteObject(this._ckksEncoder)
          this._ckksEncoder = null
          this.deleteObject(this._encryptor)
          this._encryptor = null
          this.deleteObject(this._decryptor)
          this._decryptor = null
          this.deleteObject(this._evaluator)
          this._evaluator = null

          this.postMessageSuccess(action, 'EncParams created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_CONTEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._encParms) {
            this._safeThrow({ action, message: 'You must have valid EncParms before continuing' })
            return
          }

          // Remove the previous instance
          this.deleteObject(this._context)
          this._context = null

          const context = this.morfix.Context(
            this._encParms,
            this._expandModChain,
            this._getSecurityLevel(this._securityLevel)
          )

          if (!context.parametersSet()) {
            this._safeThrow({
              action,
              message: 'Could not set the parameters in the given context. Please try different encryption parameters.'
            })
            return
          }
          this._context = context

          // Reset other internal variables
          this.deleteObject(this._keyGenerator)
          this._keyGenerator = null
          this.deleteObject(this._batchEncoder)
          this._batchEncoder = null
          this.deleteObject(this._ckksEncoder)
          this._ckksEncoder = null
          this.deleteObject(this._encryptor)
          this._encryptor = null
          this.deleteObject(this._decryptor)
          this._decryptor = null
          this.deleteObject(this._evaluator)
          this._evaluator = null

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                encParms: {
                  ...this._rawEncParms
                }
              }
            },
            'Context created successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_KEY_GENERATOR_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { payload } = action

          // Remove the previous instance
          this.deleteObject(this._keyGenerator)
          this._keyGenerator = null

          // If the user already uploaded keys, then we should use them to create the keygen
          this._keyGenerator = this.morfix.KeyGenerator(
            this._context,
            this._hasKey(payload.secret.id, 'secret') ? this._readKey(payload.secret.id, 'secret') : null,
            this._hasKey(payload.public.id, 'public') ? this._readKey(payload.public.id, 'public') : null
          )

          // If the id was an existing key, set to empty object so that the saga-watcher
          // doesn't put an action to create the corresponding key.
          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                public: {
                  ...(!this._hasKey(payload.public.id, 'public')
                    ? {
                        ...action.payload.public
                      }
                    : {})
                },
                secret: {
                  ...(!this._hasKey(payload.secret.id, 'secret')
                    ? {
                        ...action.payload.secret
                      }
                    : {})
                }
              }
            },
            'KeyGenerator created successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_PUBLIC_KEY_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // If the activeKeyId is the one we are deleting, then we need to delete the encryptor
          if (this._keys['public'].activeId === id) {
            this.deleteObject(this._encryptor)
            this._encryptor = null
          }
          // Remove the object
          this._deleteKey(id, 'public')

          this.postMessageSuccess(action, 'Deleted the PublicKey successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_SECRET_KEY_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // If the activeKeyId is the one we are deleting, then we need to delete the decryptor
          if (this._keys['secret'].activeId === id) {
            this.deleteObject(this._decryptor)
            this._decryptor = null
          }

          // Remove the object
          this._deleteKey(id, 'secret')

          this.postMessageSuccess(action, 'Deleted the SecretKey successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_RELIN_KEY_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Remove the object
          this._deleteKey(id, 'relin')

          this.postMessageSuccess(action, 'Deleted the RelinKey successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_GALOIS_KEY_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Remove the object
          this._deleteKey(id, 'galois')

          this.postMessageSuccess(action, 'Deleted the GaloisKey successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_GENERATE_PUBLIC_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._keyGenerator) {
            this._safeThrow({ action, message: 'You must have a valid KeyGenerator before continuing' })
            return
          }

          const key = this._keyGenerator.createPublicKey()

          // Add it to our internal state
          this._createKey(action.payload.id, key, 'public')

          // Reset other internal variables
          this.deleteObject(this._encryptor)
          this._encryptor = null

          this.postMessageSuccess(action, 'PublicKey created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_GENERATE_SECRET_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._keyGenerator) {
            this._safeThrow({ action, message: 'You must have a valid KeyGenerator before continuing' })
            return
          }

          const key = this._keyGenerator.secretKey()

          // Add it to our internal state
          this._createKey(action.payload.id, key, 'secret')

          // Reset other internal variables
          this.deleteObject(this._decryptor)
          this._decryptor = null

          this.postMessageSuccess(action, 'SecretKey created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_GENERATE_RELIN_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._keyGenerator) {
            this._safeThrow({ action, message: 'You must have a valid KeyGenerator before continuing' })
            return
          }

          const key = this._keyGenerator.createRelinKeys()

          // Add it to our internal state
          this._createKey(action.payload.id, key, 'relin')

          this.postMessageSuccess(action, 'RelinKey created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_GENERATE_GALOIS_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._keyGenerator) {
            this._safeThrow({ action, message: 'You must have a valid KeyGenerator before continuing' })
            return
          }

          const key = this._keyGenerator.createGaloisKeys()

          // Add it to our internal state
          this._createKey(action.payload.id, key, 'galois')

          this.postMessageSuccess(action, 'GaloisKey created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._hasKey(action.payload.id, 'public')) {
            this._safeThrow({ action, message: 'You must have a valid PublicKey before continuing' })
            return
          }

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                link: this._createDownloadLink({
                  instance: this._readKey(action.payload.id, 'public'),
                  type: this.TYPES.PUBLIC
                })
              }
            },
            'PublicKey downloaded successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DOWNLOAD_SECRET_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._hasKey(action.payload.id, 'secret')) {
            this._safeThrow({ action, message: 'You must have a valid SecretKey before continuing' })
            return
          }

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                link: this._createDownloadLink({
                  instance: this._readKey(action.payload.id, 'secret'),
                  type: this.TYPES.SECRET
                })
              }
            },
            'SecretKey downloaded successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DOWNLOAD_RELIN_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._hasKey(action.payload.id, 'relin')) {
            this._safeThrow({ action, message: 'You must have a valid RelinKey before continuing' })
            return
          }

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                link: this._createDownloadLink({
                  instance: this._readKey(action.payload.id, 'relin'),
                  type: this.TYPES.RELIN
                })
              }
            },
            'RelinKey downloaded successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DOWNLOAD_GALOIS_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._hasKey(action.payload.id, 'galois')) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                link: this._createDownloadLink({
                  instance: this._readKey(action.payload.id, 'galois'),
                  type: this.TYPES.GALOIS
                })
              }
            },
            'GaloisKey downloaded successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_UPLOAD_PUBLIC_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const encoded = action.payload.encoded.join('')

          // Create a new instance
          const key = this.morfix.PublicKey()
          key.load(this._context, encoded)

          this._createKey(action.payload.id, key, 'public')

          this.postMessageSuccess(action, 'PublicKey uploaded successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_UPLOAD_SECRET_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const encoded = action.payload.encoded.join('')

          // Create a new instance
          const key = this.morfix.SecretKey()
          key.load(this._context, encoded)

          this._createKey(action.payload.id, key, 'secret')

          this.postMessageSuccess(action, 'SecretKey uploaded successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_UPLOAD_RELIN_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const encoded = action.payload.encoded.join('')

          // Create a new instance
          const key = this.morfix.RelinKeys()
          key.load(this._context, encoded)

          this._createKey(action.payload.id, key, 'relin')

          this.postMessageSuccess(action, 'RelinKey uploaded successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_UPLOAD_GALOIS_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const encoded = action.payload.encoded.join('')

          // Create a new instance
          const key = this.morfix.GaloisKeys()
          key.load(this._context, encoded)

          this._createKey(action.payload.id, key, 'galois')

          this.postMessageSuccess(action, 'GaloisKeys uploaded successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { id } = action.payload
          this._setActiveKey(id, 'relin')

          this.postMessageSuccess(action, 'RelinKey set active successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_SET_ACTIVE_GALOIS_KEY_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { id } = action.payload
          this._setActiveKey(id, 'galois')

          this.postMessageSuccess(action, 'GaloisKey set active successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_BATCH_ENCODER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          // Remove the previous instance
          this.deleteObject(this._batchEncoder)
          this._batchEncoder = null

          this._batchEncoder = this.morfix.BatchEncoder(this._context)

          this.postMessageSuccess(action, 'BatchEncoder created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_CKKS_ENCODER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          // Remove the previous instance
          this.deleteObject(this._ckksEncoder)
          this._ckksEncoder = null

          this._ckksEncoder = this.morfix.CKKSEncoder(this._context)

          this.postMessageSuccess(action, 'CkksEncoder created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_ENCRYPTOR_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context || !this._hasKey(action.payload.publicKeyId, 'public')) {
            this._safeThrow({ action, message: 'You must have a valid Context and PublicKey before continuing' })
            return
          }

          // Remove the previous instance
          this.deleteObject(this._encryptor)
          this._encryptor = null

          this._encryptor = this.morfix.Encryptor(this._context, this._readKey(action.payload.publicKeyId, 'public'))

          this.postMessageSuccess(action, 'Encryptor created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_DECRYPTOR_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context || !this._hasKey(action.payload.secretKeyId, 'secret')) {
            this._safeThrow({ action, message: 'You must have a valid Context and SecretKey before continuing' })
            return
          }

          // Remove the previous instance
          this.deleteObject(this._decryptor)
          this._decryptor = null

          this._decryptor = this.morfix.Decryptor(this._context, this._readKey(action.payload.secretKeyId, 'secret'))

          this.postMessageSuccess(action, 'Decryptor created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_ENCRYPTOR_REQUEST]: this._createAction(async action => {
        try {
          // Remove the previous instance
          this.deleteObject(this._encryptor)
          this._encryptor = null

          this.postMessageSuccess(action, 'Encryptor deleted successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_DECRYPTOR_REQUEST]: this._createAction(async action => {
        try {
          // Remove the previous instance
          this.deleteObject(this._decryptor)
          this._decryptor = null

          this.postMessageSuccess(action, 'Decryptor deleted successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_EVALUATOR_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          // Remove the previous instance
          this.deleteObject(this._evaluator)
          this._evaluator = null

          this._evaluator = this.morfix.Evaluator(this._context)

          this.postMessageSuccess(action, 'Evaluator created successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_BATCH_ENCODE_INT32_REQUEST]: this._createAction(async action => {
        try {
          if (!this._batchEncoder) {
            this._safeThrow({ action, message: 'You must have a valid BatchEncoder before continuing' })
            return
          }

          const { id } = action.payload
          const array = Int32Array.from(action.payload.array.split(',').map(x => parseInt(x, 10)))

          // Get the plaintext by the passed in Id
          const plainText = this._getPlain(id)

          // Reset memory in case it was set to NTT form.
          // This is needed because re-encoding a plaintext which is already in NTT form
          // will fail when using the bfv scheme.
          if (
            plainText.isNttForm &&
            (this._encParms.scheme === this.morfix.SchemeType.bfv ||
              this._encParms.scheme === this.morfix.SchemeType.bgv)
          ) {
            plainText.release()
          }

          // Encode the vector to the plaintext
          this._batchEncoder.encode(array, plainText)

          this.postMessageSuccess(action, 'Encoded the array successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_BATCH_ENCODE_UINT32_REQUEST]: this._createAction(async action => {
        try {
          if (!this._batchEncoder) {
            this._safeThrow({ action, message: 'You must have a valid BatchEncoder before continuing' })
            return
          }

          const { id } = action.payload
          const array = Uint32Array.from(action.payload.array.split(',').map(x => parseInt(x, 10)))

          // Get the plaintext by the passed in Id
          const plainText = this._getPlain(id)

          // Encode the vector to the plaintext
          this._batchEncoder.encode(array, plainText)

          this.postMessageSuccess(action, 'Encoded the array successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CKKS_ENCODE_FLOAT64_REQUEST]: this._createAction(async action => {
        try {
          if (!this._ckksEncoder) {
            this._safeThrow({ action, message: 'You must have a valid CkksEncoder before continuing' })
            return
          }

          const { scale, id } = action.payload
          const array = Float64Array.from(action.payload.array.split(',').map(x => parseFloat(x)))

          // Get the plaintext by the passed in Id
          const plainText = this._getPlain(id)

          // Encode the vector to the plaintext
          this._ckksEncoder.encode(array, Math.pow(2, scale), plainText)

          this.postMessageSuccess(action, 'Encoded the array successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_BATCH_DECODE_INT32_REQUEST]: this._createAction(async action => {
        try {
          if (!this._batchEncoder) {
            this._safeThrow({ action, message: 'You must have a valid BatchEncoder before continuing' })
            return
          }

          const { id } = action.payload

          // Get the plaintext
          const plainText = this._getPlain(id)

          // Decode the plaintext
          const array = this._batchEncoder.decode(plainText)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                array
              }
            },
            'Decoded the plaintext successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_BATCH_DECODE_UINT32_REQUEST]: this._createAction(async action => {
        try {
          if (!this._batchEncoder) {
            this._safeThrow({ action, message: 'You must have a valid BatchEncoder before continuing' })
            return
          }

          const { id } = action.payload

          // Get the plaintext
          const plainText = this._getPlain(id)

          // Decode the plaintext to the vector
          const array = this._batchEncoder.decode(plainText, false)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                array
              }
            },
            'Decoded the plaintext successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CKKS_DECODE_FLOAT64_REQUEST]: this._createAction(async action => {
        try {
          if (!this._ckksEncoder) {
            this._safeThrow({ action, message: 'You must have a valid CkksEncoder before continuing' })
            return
          }

          const { id } = action.payload

          // Get the plaintext
          const plainText = this._getPlain(id)

          // Decode the plaintext to the vector
          const array = this._ckksEncoder.decode(plainText)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                array: array.map(x => x.toFixed(3))
              }
            },
            'Decoded the plaintext successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_PLAIN_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Create a plaintext
          const plainText = this.morfix.PlainText()

          // Add it to our internal state
          this._addToPlains(id, plainText)

          this.postMessageSuccess(action, 'Created a PlainText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_READ_PLAIN_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Get the object
          const plainText = this._getPlain(id)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                encoded: plainText.save()
              }
            },
            'PlainText read successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_PLAIN_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Remove the object
          this._deletePlain(id)

          this.postMessageSuccess(action, 'Deleted the PlainText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DOWNLOAD_PLAIN_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Remove the object
          const plainText = this._getPlain(id)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                link: this._createDownloadLink({ instance: plainText, type: this.TYPES.PLAIN_TEXT })
              }
            },
            'PlainText downloaded successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_UPLOAD_PLAIN_TEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { id } = action.payload
          const encoded = action.payload.encoded.join('')

          const plainText = this.morfix.PlainText()
          plainText.load(this._context, encoded)
          this._addToPlains(id, plainText)

          this.postMessageSuccess(action, 'Uploaded the PlainText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_LOAD_PLAIN_TEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { id, encoded } = action.payload

          const plainText = this._getPlain(id)
          plainText.load(this._context, encoded)

          this.postMessageSuccess(action, 'Loaded the PlainText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_CREATE_CIPHER_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Create a plaintext
          const cipherText = this.morfix.CipherText()

          // Add it to our internal state
          this._addToCiphers(id, cipherText)

          this.postMessageSuccess(action, 'Created a CipherText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_READ_CIPHER_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Get the object
          const cipherText = this._getCipher(id)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                encoded: cipherText.save()
              }
            },
            'CipherText read successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DELETE_CIPHER_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Remove the object
          this._deleteCipher(id)

          this.postMessageSuccess(action, 'Deleted the CipherText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DOWNLOAD_CIPHER_TEXT_REQUEST]: this._createAction(async action => {
        try {
          // Extract the unique ID from the payload
          const { id } = action.payload

          // Remove the object
          const cipherText = this._getCipher(id)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                link: this._createDownloadLink({ instance: cipherText, type: this.TYPES.CIPHER_TEXT })
              }
            },
            'CipherText downloaded successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_UPLOAD_CIPHER_TEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { id } = action.payload
          const encoded = action.payload.encoded.join('')

          const cipherText = this.morfix.CipherText()
          cipherText.load(this._context, encoded)
          this._addToCiphers(id, cipherText)

          this.postMessageSuccess(action, 'Uploaded the CipherText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_LOAD_CIPHER_TEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { id, encoded } = action.payload

          const cipherText = this._getCipher(id)
          cipherText.load(this._context, encoded)

          this.postMessageSuccess(action, 'Loaded the CipherText successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_ENCRYPT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._encryptor) {
            this._safeThrow({ action, message: 'You must have a valid Encryptor before continuing' })
            return
          }

          const { plainTextId, cipherTextId } = action.payload

          const plainText = this._getPlain(plainTextId)
          const cipherText = this._getCipher(cipherTextId)

          this._encryptor.encrypt(plainText, cipherText)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                id: cipherTextId
              }
            },
            'Encrypted the PlainText successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_DECRYPT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._decryptor) {
            this._safeThrow({ action, message: 'You must have a valid Decryptor before continuing' })
            return
          }

          const { plainTextId, cipherTextId } = action.payload

          const plainText = this._getPlain(plainTextId)
          const cipherText = this._getCipher(cipherTextId)

          this._decryptor.decrypt(cipherText, plainText)

          this.postMessageSuccess(
            {
              ...action,
              payload: {
                ...action.payload,
                id: plainTextId
              }
            },
            'Decrypted the CipherText successfully!'
          )
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_NEGATE_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.negate(encrypted, destination)

          this.postMessageSuccess(action, 'Negated successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdB, cipherTextIdDestination } = action.payload

          const a = this._getCipher(cipherTextIdA)
          const b = this._getCipher(cipherTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.add(a, b, destination)

          this.postMessageSuccess(action, 'Added successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, plainTextIdB, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const plain = this._getPlain(plainTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.addPlain(encrypted, plain, destination)

          this.postMessageSuccess(action, 'Added successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdB, cipherTextIdDestination } = action.payload

          const a = this._getCipher(cipherTextIdA)
          const b = this._getCipher(cipherTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.sub(a, b, destination)

          this.postMessageSuccess(action, 'Subtracted successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, plainTextIdB, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const plain = this._getPlain(plainTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.subPlain(encrypted, plain, destination)

          this.postMessageSuccess(action, 'Subtracted successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdB, cipherTextIdDestination } = action.payload

          const a = this._getCipher(cipherTextIdA)
          const b = this._getCipher(cipherTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.multiply(a, b, destination)

          this.postMessageSuccess(action, 'Multiplied successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, plainTextIdB, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const plain = this._getPlain(plainTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.multiplyPlain(encrypted, plain, destination)

          this.postMessageSuccess(action, 'Multiplied successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_SQUARE_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.square(encrypted, destination)

          this.postMessageSuccess(action, 'Squared successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['relin'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid RelinKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.relinearize(encrypted, this._readKey(this._keys['relin'].activeId, 'relin'), destination)

          this.postMessageSuccess(action, 'Relinearized successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_EXPONENTIATE_CIPHER_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['relin'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid RelinKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload
          const exponent = parseInt(action.payload.exponent, 10)

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.exponentiate(
            encrypted,
            exponent,
            this._readKey(this._keys['relin'].activeId, 'relin'),
            destination
          )

          this.postMessageSuccess(action, 'Exponentiated successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.cipherModSwitchToNext(encrypted, destination)

          this.postMessageSuccess(action, 'Switched CipherText modulus successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { plainTextIdA, plainTextIdDestination } = action.payload

          const plain = this._getPlain(plainTextIdA)
          const destination = this._getPlain(plainTextIdDestination)

          this._evaluator.plainModSwitchToNext(plain, destination)

          this.postMessageSuccess(action, 'Switched PlainText modulus successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.rescaleToNext(encrypted, destination)

          this.postMessageSuccess(action, 'Rescaled successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._context) {
            this._safeThrow({ action, message: 'You must have a valid Context before continuing' })
            return
          }

          const { plainTextIdA, plainTextIdDestination } = action.payload

          const plain = this._getPlain(plainTextIdA)
          const parmsId = this._context.firstParmsId
          const destinationNtt = this._getPlain(plainTextIdDestination)

          this._evaluator.plainTransformToNtt(plain, parmsId, destinationNtt)

          this.postMessageSuccess(action, 'Transformed to NTT successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destinationNtt = this._getCipher(cipherTextIdDestination)

          this._evaluator.cipherTransformToNtt(encrypted, destinationNtt)

          this.postMessageSuccess(action, 'Transformed to NTT successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encryptedNtt = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.cipherTransformFromNtt(encryptedNtt, destination)

          this.postMessageSuccess(action, 'Transformed from NTT successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_ROTATE_ROWS_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['galois'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload
          const steps = parseInt(action.payload.steps, 10)

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.rotateRows(
            encrypted,
            steps,
            this._readKey(this._keys['galois'].activeId, 'galois'),
            destination
          )

          this.postMessageSuccess(action, 'Rotated rows successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_ROTATE_COLUMNS_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['galois'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.rotateColumns(encrypted, this._readKey(this._keys['galois'].activeId, 'galois'), destination)

          this.postMessageSuccess(action, 'Rotated columns successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_ROTATE_VECTOR_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['galois'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload
          const steps = parseInt(action.payload.steps, 10)

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.rotateVector(
            encrypted,
            steps,
            this._readKey(this._keys['galois'].activeId, 'galois'),
            destination
          )

          this.postMessageSuccess(action, 'Rotated vector successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_COMPLEX_CONJUGATE_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['galois'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.complexConjugate(
            encrypted,
            this._readKey(this._keys['galois'].activeId, 'galois'),
            destination
          )

          this.postMessageSuccess(action, 'Complex conjugated successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_SUM_ELEMENTS_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['galois'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdDestination } = action.payload

          const encrypted = this._getCipher(cipherTextIdA)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.sumElements(
            encrypted,
            this._readKey(this._keys['galois'].activeId, 'galois'),
            this._encParms.scheme,
            destination
          )

          this.postMessageSuccess(action, 'Summed all elements successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_DOT_PRODUCT_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['relin'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid RelinKey before continuing' })
            return
          }

          if (!this._keys['galois'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          const { cipherTextIdA, cipherTextIdB, cipherTextIdDestination } = action.payload

          const a = this._getCipher(cipherTextIdA)
          const b = this._getCipher(cipherTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.dotProduct(
            a,
            b,
            this._readKey(this._keys['relin'].activeId, 'relin'),
            this._readKey(this._keys['galois'].activeId, 'galois'),
            this._encParms.scheme,
            destination
          )

          this.postMessageSuccess(action, 'Inner product computed successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      }),
      [MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_REQUEST]: this._createAction(async action => {
        try {
          if (!this._evaluator) {
            this._safeThrow({ action, message: 'You must have a valid Evaluator before continuing' })
            return
          }

          if (!this._keys['galois'].activeId) {
            this._safeThrow({ action, message: 'You must have a valid GaloisKey before continuing' })
            return
          }

          const { cipherTextIdA, plainTextIdB, cipherTextIdDestination } = action.payload

          const a = this._getCipher(cipherTextIdA)
          const b = this._getPlain(plainTextIdB)
          const destination = this._getCipher(cipherTextIdDestination)

          this._evaluator.dotProductPlain(
            a,
            b,
            this._readKey(this._keys['galois'].activeId, 'galois'),
            this._encParms.scheme,
            destination
          )

          this.postMessageSuccess(action, 'Inner product computed successfully!')
        } catch (e) {
          this._safeThrow({ action, message: e })
        }
      })
    }
  }

  /**
   * Remove an object by its key
   * @param key
   * @param obj
   * @returns {*}
   * @private
   */
  _removeKey(key, obj) {
    // eslint-disable-next-line no-unused-vars
    const { [key]: _, ...res } = obj
    return res
  }

  /**
   * Add a plaintext to our internal state
   * @param id
   * @param plain
   * @private
   */
  _addToPlains(id, plain) {
    if (!this._havePlain(id)) {
      this._plainText.allIds = [...this._plainText.allIds, id]
    }
    this._plainText.byId = {
      ...this._plainText.byId,
      [id]: plain
    }
  }

  /**
   * Add a ciphertext to our internal state
   * @param id
   * @param cipher
   * @private
   */
  _addToCiphers(id, cipher) {
    if (!this._haveCipher(id)) {
      this._cipherText.allIds = [...this._cipherText.allIds, id]
    }
    this._cipherText.byId = {
      ...this._cipherText.byId,
      [id]: cipher
    }
  }

  /**
   * Returns a plaintext object from its Id
   * @param id
   * @returns {*}
   * @private
   */
  _getPlain(id) {
    if (this._plainText.byId[id]) {
      return this._plainText.byId[id]
    }
    throw new Error('No PlainText by that Id!')
  }

  /**
   * True if we have a plaintext by the specified id
   * @param id
   * @returns {boolean}
   * @private
   */
  _havePlain(id) {
    return Boolean(this._plainText.byId[id])
  }

  /**
   * Returns a ciphertext object from its Id
   * @param id
   * @returns {*}
   * @private
   */
  _getCipher(id) {
    if (this._cipherText.byId[id]) {
      return this._cipherText.byId[id]
    }
    throw new Error('No CipherText by that Id!')
  }

  /**
   * True if we have a ciphertext by the specified id
   * @param id
   * @returns {boolean}
   * @private
   */
  _haveCipher(id) {
    return Boolean(this._cipherText.byId[id])
  }

  /**
   * Remove a plaintext by its Id
   * @param id
   * @private
   */
  _deletePlain(id) {
    if (this._plainText.byId[id] && this._plainText.byId[id].instance) {
      this.deleteObject(this._plainText.byId[id])
      this._plainText.byId = this._removeKey(id, this._plainText.byId)
      this._plainText.allIds = this._plainText.allIds.filter(plainId => plainId !== id)
    }
  }

  /**
   * Remove a ciphertext by its Id
   * @param id
   * @private
   */
  _deleteCipher(id) {
    if (this._cipherText.byId[id] && this._cipherText.byId[id].instance) {
      this.deleteObject(this._cipherText.byId[id])
      this._cipherText.byId = this._removeKey(id, this._cipherText.byId)
      this._cipherText.allIds = this._cipherText.allIds.filter(cipherId => cipherId !== id)
    }
  }

  _createKey(id, key, type) {
    this._keys = {
      ...this._keys,
      [type]: {
        activeId: id,
        byId: {
          ...this._keys[type].byId,
          [id]: key
        },
        allIds: [...this._keys[type].allIds, id]
      }
    }
  }

  _readKey(id, type) {
    if (!this._hasKey(id, type)) {
      throw new Error(`No ${type} key by that Id!`)
    }
    return this._keys[type].byId[id]
  }

  _hasKey(id, type) {
    return Boolean(this._keys[type].byId[id])
  }

  _setActiveKey(id, type) {
    if (!this._hasKey(id, type)) {
      throw new Error(`No ${type} key by that Id!`)
    }
    this._keys = {
      ...this._keys,
      [type]: {
        ...this._keys[type],
        activeId: id
      }
    }
  }

  _deleteKey(id, type) {
    if (!this._hasKey(id, type)) {
      return
    }
    this.deleteObject(this._keys[type].byId[id])
    this._keys = {
      ...this._keys,
      [type]: {
        activeId: this._keys[type].activeId === id ? '' : this._keys[type].activeId,
        byId: this._removeKey(id, this._keys[type].byId),
        allIds: this._keys[type].allIds.filter(keyId => keyId !== id)
      }
    }
  }

  /**
   * Delete a an internal instance as emscripten doesn't automatically garbage collect
   * @param object
   */
  deleteObject(object) {
    if (object) {
      if (object.instance) {
        object.instance.delete()
      }
      object = null
    }
  }
  /**
   * Checks to make sure the library is initialized before performing any actions.
   * @returns {Promise<void>}
   * @private
   */
  async _initialize() {
    if (!this._initialized || !this.morfix) {
      this.morfix = await this.seal()
      this._version = this.morfix.Version

      this.schemeTypes = {
        [SCHEME_TYPES.none]: this.morfix.SchemeType.none,
        [SCHEME_TYPES.bfv]: this.morfix.SchemeType.bfv,
        [SCHEME_TYPES.bgv]: this.morfix.SchemeType.bgv,
        [SCHEME_TYPES.ckks]: this.morfix.SchemeType.ckks
      }

      this.securityLevels = {
        [SECURITY_LEVELS.none]: this.morfix.SecurityLevel.none,
        [SECURITY_LEVELS.BITS_128]: this.morfix.SecurityLevel.tc128,
        [SECURITY_LEVELS.BITS_192]: this.morfix.SecurityLevel.tc192,
        [SECURITY_LEVELS.BITS_256]: this.morfix.SecurityLevel.tc256
      }

      this.polyModulusDegrees = {
        [POLYMODULUS_DEGREES.BITS_2]: 2,
        [POLYMODULUS_DEGREES.BITS_4]: 4,
        [POLYMODULUS_DEGREES.BITS_8]: 8,
        [POLYMODULUS_DEGREES.BITS_16]: 16,
        [POLYMODULUS_DEGREES.BITS_32]: 32,
        [POLYMODULUS_DEGREES.BITS_64]: 64,
        [POLYMODULUS_DEGREES.BITS_128]: 128,
        [POLYMODULUS_DEGREES.BITS_256]: 256,
        [POLYMODULUS_DEGREES.BITS_512]: 512,
        [POLYMODULUS_DEGREES.BITS_1024]: 1024,
        [POLYMODULUS_DEGREES.BITS_2048]: 2048,
        [POLYMODULUS_DEGREES.BITS_4096]: 4096,
        [POLYMODULUS_DEGREES.BITS_8192]: 8192,
        [POLYMODULUS_DEGREES.BITS_16384]: 16384,
        [POLYMODULUS_DEGREES.BITS_32768]: 32768
      }

      this._initialized = true
    }
  }

  _getSchemeType(scheme) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.schemeTypes.hasOwnProperty(scheme)) {
      return this.schemeTypes[scheme]
    }
    throw new Error('Unsupported SchemeType!')
  }

  _getSecurityLevel(level) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.securityLevels.hasOwnProperty(level)) {
      return this.securityLevels[level]
    }
    throw new Error('Unsupported SecurityLevel!')
  }

  _getPolyModulusDegree(degree) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.polyModulusDegrees.hasOwnProperty(degree)) {
      return this.polyModulusDegrees[degree]
    }
    throw new Error('Unsupported PolyModulusDegree!')
  }

  /**
   * Create an Action wrapped with our middleware.
   *
   * This private method ensures we have an initialized morfix library before
   * continuing.
   *
   * @param fn
   * @returns {Function}
   * @private
   */
  _createAction(fn) {
    return async action => {
      await this._initialize()
      return fn.apply(this, [action])
    }
  }

  /**
   * Sends a successful payload to the main process
   * @param action
   * @param message
   */
  postMessageSuccess(action, message) {
    // eslint-disable-next-line no-restricted-globals
    self.postMessage({
      ...action,
      payload: {
        ...action.payload,
        statusCode: 200,
        message
      },
      type: action.type.replace('REQUEST', 'SUCCESS')
    })
  }

  /**
   * Sends a failed payload to the main process
   * @param action
   * @param message
   */
  postMessageFailure(action, message) {
    // eslint-disable-next-line no-restricted-globals
    self.postMessage({
      ...action,
      payload: {
        ...action.payload,
        statusCode: 400,
        message
      },
      type: action.type.replace('REQUEST', 'FAILURE')
    })
  }

  /**
   * Process an action payload
   *
   * @param {Object} e - WebWorker message object
   * @param {Object} e.data - WebWorker message data
   * @param {string} e.data.id - WebWorker message Id
   * @param {string} e.data.type - WebWorker message action type
   * @param {Object} e.data.payload - WebWorker message action payload
   *
   * @returns {*}
   */
  handleMessage(e) {
    const { data } = e
    const { type } = data // Contains: id, type, payload
    // eslint-disable-next-line no-prototype-builtins
    if (this.actions.hasOwnProperty(type)) {
      return this.actions[type](data)
    }
    this.postMessageFailure(data, 'Unknown action type!')
  }

  /**
   * Handles the exception gracefully and sets the appropriate error message
   * @param action
   * @param pointer
   * @private
   */
  _safeThrow({ action, message }) {
    const errorMsg = message instanceof Error ? message.message : message
    this.postMessageFailure(action, errorMsg)
  }

  /**
   * Creates an Object URL to download
   * @param key
   * @param type
   * @returns {string}
   * @private
   */
  _createDownloadLink({ instance, type }) {
    const base64 = instance.save()
    const formatted = this._formatSSH(base64, type)
    // eslint-disable-next-line no-restricted-globals
    const blob = new Blob([formatted], { type: 'octet/stream' })
    return URL.createObjectURL(blob)
  }

  /**
   * Takes a base64 string and formats it nicely according to its type
   * @param key
   * @param type
   * @returns {string}
   * @private
   */
  _formatSSH(key, type) {
    const BEGIN = `-----BEGIN MORFIX ${type}-----`
    const VERSION = `Version: ${this._version}`
    const strArr = key.match(/.{1,64}/g)
    const END = `-----END MORFIX ${type}-----`
    return [BEGIN, VERSION, '', ...strArr, END].join('\n')
  }
}

const worker = new MyWorker()

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', worker.handleMessage)
