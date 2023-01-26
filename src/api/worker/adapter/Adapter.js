import shortid from 'shortid'
import EventEmitter from 'events'

/**
 * WebWorker class adapter
 */
class WorkerAdapter {
  constructor(Worker) {
    this._workerConstructor = Worker
    this._initWorker()

    // Create event listeners for each dispatched action
    this.dispatch = new EventEmitter()
    this.dispatch.setMaxListeners(Infinity)
  }

  _initWorker() {
    if (this.worker) {
      return
    }
    this.worker = new this._workerConstructor()
    // Private handlers
    this.worker.onmessage = this._handleMessage.bind(this)
  }
  /**
   * Send's raw data to the web worker
   *
   * @param action
   * @private
   */
  _postMessage = action => {
    this.worker.postMessage(action)
  }

  /**
   * Dispatches an action to the web worker and returns a promise
   *
   * @param action
   * @returns {Promise<Object>}
   * @private
   */
  _dispatchAction = action => {
    this._initWorker()
    const id = shortid()
    return new Promise((resolve, reject) => {
      this._postMessage({ ...action, id })

      // Create temporary listener on the payload Id. This is only fired 1 time.
      // The response type will always be an action string.
      this.dispatch.once(id, response => {
        response.type.includes('SUCCESS') ? resolve(response) : reject(response)
      })
    })
  }

  /**
   * Handles messages received from the Web Worker
   *
   * @param e
   * @private
   */
  _handleMessage(e) {
    const action = e.data
    this.dispatch.emit(action.id, action)
  }

  /**
   * Creates Enc Parms
   * @param action
   * @returns {Promise<Object>}
   */
  createEncParms = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates an Encryption Context
   * @param action
   * @returns {Promise<Object>}
   */
  createContext = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates a Key Generator used to generate public/secret/relin/galois keys
   * @param action
   * @returns {Promise<Object>}
   */
  createKeyGenerator = action => {
    return this._dispatchAction(action)
  }
  /**
   * Delete a Public Key
   * @param action
   * @returns {Promise<Object>}
   */
  deletePublicKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Delete a Secret Key
   * @param action
   * @returns {Promise<Object>}
   */
  deleteSecretKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Delete a Relin Key
   * @param action
   * @returns {Promise<Object>}
   */
  deleteRelinKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Delete a Galois Key
   * @param action
   * @returns {Promise<Object>}
   */
  deleteGaloisKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Generates a Public Key
   * @param action
   * @returns {Promise<Object>}
   */
  generatePublicKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Generates a Secret Key
   * @param action
   * @returns {Promise<Object>}
   */
  generateSecretKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Generates a Relin Key
   * @param action
   * @returns {Promise<Object>}
   */
  generateRelinKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Generates a Galois Key
   * @param action
   * @returns {Promise<Object>}
   */
  generateGaloisKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Downloads a Public Key
   * @param action
   * @returns {Promise<Object>}
   */
  downloadPublicKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Downloads a Secret Key
   * @param action
   * @returns {Promise<Object>}
   */
  downloadSecretKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Downloads a Relin Key
   * @param action
   * @returns {Promise<Object>}
   */
  downloadRelinKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Downloads a Galois Key
   * @param action
   * @returns {Promise<Object>}
   */
  downloadGaloisKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Uploads a Public Key
   * @param action
   * @returns {Promise<Object>}
   */
  uploadPublicKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Uploads a Secret Key
   * @param action
   * @returns {Promise<Object>}
   */
  uploadSecretKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Uploads a Relin Key
   * @param action
   * @returns {Promise<Object>}
   */
  uploadRelinKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Uploads a Galois Key
   * @param action
   * @returns {Promise<Object>}
   */
  uploadGaloisKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Sets the active Relin Key
   * @param action
   * @returns {Promise<Object>}
   */
  setActiveRelinKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Sets the active Galois Key
   * @param action
   * @returns {Promise<Object>}
   */
  setActiveGaloisKey = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates an Integer Encoder
   * @param action
   * @returns {Promise<Object>}
   */
  createIntegerEncoder = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates a bfv Batch Encoder
   * @param action
   * @returns {Promise<Object>}
   */
  createBatchEncoder = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates a ckks Encoder (for ckks only)
   * @param action
   * @returns {Promise<Object>}
   */
  createCkksEncoder = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates an Encryptor
   * @param action
   * @returns {Promise<Object>}
   */
  createEncryptor = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates a Decryptor
   * @param action
   * @returns {Promise<Object>}
   */
  createDecryptor = action => {
    return this._dispatchAction(action)
  }
  /**
   * Creates an Evaluator
   * @param action
   * @returns {Promise<Object>}
   */
  createEvaluator = action => {
    return this._dispatchAction(action)
  }

  /**
   * Encode an array of integers to a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  batchEncodeInt32 = action => {
    return this._dispatchAction(action)
  }

  /**
   * Encode an array of unsigned ints to a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  batchEncodeUint32 = action => {
    return this._dispatchAction(action)
  }

  /**
   * Encode an array of floats to a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  ckksEncodeFloat64 = action => {
    return this._dispatchAction(action)
  }

  /**
   * Decode a plaintext to an array of ints
   * @param action
   * @returns {Promise<Object>}
   */
  batchDecodeInt32 = action => {
    return this._dispatchAction(action)
  }

  /**
   * Decode a plaintext to an array of unsigned ints
   * @param action
   * @returns {Promise<Object>}
   */
  batchDecodeUint32 = action => {
    return this._dispatchAction(action)
  }

  /**
   * Decode a plaintext to an array of floats
   * @param action
   * @returns {Promise<Object>}
   */
  ckksDecodeFloat64 = action => {
    return this._dispatchAction(action)
  }

  /**
   * Create a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  createPlainText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Read a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  readPlainText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Delete a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  deletePlainText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Download a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  downloadPlainText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Upload a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  uploadPlainText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Load a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  loadPlainText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Create a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  createCipherText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Read a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  readCipherText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Delete a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  deleteCipherText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Download a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  downloadCipherText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Upload a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  uploadCipherText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Load a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  loadCipherText = action => {
    return this._dispatchAction(action)
  }

  /**
   * Encrypt a plaintext to a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  encrypt = action => {
    return this._dispatchAction(action)
  }

  /**
   * Decrypt a ciphertext to a plaintext
   * @param action
   * @returns {Promise<Object>}
   */
  decrypt = action => {
    return this._dispatchAction(action)
  }

  /**
   * Negates a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateNegateCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Add a ciphertext to a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateAddCipherToCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Add a plaintext to a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateAddPlainToCipher = action => {
    return this._dispatchAction(action)
  }
  /**
   * Subtracts a ciphertext from a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateSubCipherFromCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Subtracts a plaintext from a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateSubPlainFromCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Multiplies a ciphertext and a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateMultiplyCipherByCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Multiplies a plaintext and a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateMultiplyCipherByPlain = action => {
    return this._dispatchAction(action)
  }

  /**
   * Squares a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateSquareCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Relinearizes a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateRelinearizeCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Exponentiates a ciphertext
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateExponentiateCipher = action => {
    return this._dispatchAction(action)
  }

  /**
   * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
   * modulus down to q_1...q_{k-1} and stores the result in the destination
   * parameter.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateCipherModulusSwitchToNext = action => {
    return this._dispatchAction(action)
  }
  /**
   * Modulus switches an NTT transformed plaintext from modulo q_1...q_k down
   * to modulo q_1...q_{k-1} and stores the result in the destination parameter.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluatePlainModulusSwitchToNext = action => {
    return this._dispatchAction(action)
  }

  /**
   * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
   * modulus down to q_1...q_{k-1}, scales the message down accordingly, and
   * stores the result in the destination parameter.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateCipherRescaleToNext = action => {
    return this._dispatchAction(action)
  }

  /**
   * Transforms a PlainText to NTT domain. This functions applies the Number
   * Theoretic Transform to a PlainText by first embedding integers modulo the
   * PlainText modulus to integers modulo the coefficient modulus and then
   * performing David Harvey's NTT on the resulting polynomial. The transformation
   * is done with respect to encryption parameters corresponding to a given
   * parmsId. The result is stored in the destinationNtt parameter. For the
   * operation to be valid, the PlainText must have degree less than PolyModulusDegree
   * and each coefficient must be less than the PlainText modulus, i.e., the PlainText
   * must be a valid PlainText under the current encryption parameters. Dynamic
   * memory allocations in the process are allocated from the memory pool pointed
   * to by the given MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluatePlainTransformToNTT = action => {
    return this._dispatchAction(action)
  }

  /**
   * Transforms a ciphertext to NTT domain. This functions applies David Harvey's
   * Number Theoretic Transform separately to each polynomial of a ciphertext.
   * The result is stored in the destination_ntt parameter.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateCipherTransformToNTT = action => {
    return this._dispatchAction(action)
  }

  /**
   * Transforms a ciphertext back from NTT domain. This functions applies the
   * inverse of David Harvey's Number Theoretic Transform separately to each
   * polynomial of a ciphertext. The result is stored in the destination parameter.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateCipherTransformFromNTT = action => {
    return this._dispatchAction(action)
  }

  /**
   * Rotates plaintext matrix rows cyclically. When batching is used with the
   * bfv scheme, this function rotates the encrypted plaintext matrix rows
   * cyclically to the left (steps > 0) or to the right (steps < 0) and writes
   * the result to the destination parameter. Since the size of the batched
   * matrix is 2-by-(N/2), where N is the degree of the polynomial modulus,
   * the number of steps to rotate must have absolute value at most N/2-1. Dynamic
   * memory allocations in the process are allocated from the memory pool pointed
   * to by the given MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateRotateRows = action => {
    return this._dispatchAction(action)
  }

  /**
   * Rotates plaintext matrix columns cyclically. When batching is used with
   * the bfv scheme, this function rotates the encrypted plaintext matrix columns
   * cyclically, and writes the result to the destination parameter. Since the
   * size of the batched matrix is 2-by-(N/2), where N is the degree of the
   * polynomial modulus, this means simply swapping the two rows. Dynamic memory
   * allocations in the process are allocated from the memory pool pointed to
   * by the given MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateRotateColumns = action => {
    return this._dispatchAction(action)
  }

  /**
   * Rotates plaintext vector cyclically. When using the ckks scheme, this function
   * rotates the encrypted plaintext vector cyclically to the left (steps > 0)
   * or to the right (steps < 0) and writes the result to the destination parameter.
   * Since the size of the batched matrix is 2-by-(N/2), where N is the degree
   * of the polynomial modulus, the number of steps to rotate must have absolute
   * value at most N/2-1. Dynamic memory allocations in the process are allocated
   * from the memory pool pointed to by the given MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateRotateVector = action => {
    return this._dispatchAction(action)
  }

  /**
   * Complex conjugates PlainText slot values. When using the ckks scheme, this
   * function complex conjugates all values in the underlying PlainText, and
   * writes the result to the destination parameter. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateComplexConjugate = action => {
    return this._dispatchAction(action)
  }

  /**
   * Sums all elements in a CipherText and stores the result in each of the
   * slots in the underlying PlainText. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateSumElements = action => {
    return this._dispatchAction(action)
  }
  /**
   * Performs a dot product of two CipherTexts and stores the result in each of the
   * slots in the underlying PlainText. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateDotProduct = action => {
    return this._dispatchAction(action)
  }
  /**
   * Performs a dot product of a Cipher and a Plain and stores the result in each of the
   * slots in the underlying PlainText. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   * @param action
   * @returns {Promise<Object>}
   */
  evaluateDotProductPlain = action => {
    return this._dispatchAction(action)
  }
}

export default WorkerAdapter
