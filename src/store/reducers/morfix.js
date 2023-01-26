import { createReducer } from 'store/utils'

import {
  MORFIX_CREATE_ENC_PARMS_REQUEST,
  MORFIX_CREATE_ENC_PARMS_SUCCESS,
  MORFIX_CREATE_ENC_PARMS_FAILURE,
  MORFIX_CREATE_CONTEXT_REQUEST,
  MORFIX_CREATE_CONTEXT_SUCCESS,
  MORFIX_CREATE_CONTEXT_FAILURE,
  MORFIX_CREATE_KEY_GENERATOR_REQUEST,
  MORFIX_CREATE_KEY_GENERATOR_SUCCESS,
  MORFIX_CREATE_KEY_GENERATOR_FAILURE,
  MORFIX_DELETE_PUBLIC_KEY_REQUEST,
  MORFIX_DELETE_PUBLIC_KEY_SUCCESS,
  MORFIX_DELETE_PUBLIC_KEY_FAILURE,
  MORFIX_DELETE_SECRET_KEY_REQUEST,
  MORFIX_DELETE_SECRET_KEY_SUCCESS,
  MORFIX_DELETE_SECRET_KEY_FAILURE,
  MORFIX_DELETE_RELIN_KEY_REQUEST,
  MORFIX_DELETE_RELIN_KEY_SUCCESS,
  MORFIX_DELETE_RELIN_KEY_FAILURE,
  MORFIX_DELETE_GALOIS_KEY_REQUEST,
  MORFIX_DELETE_GALOIS_KEY_SUCCESS,
  MORFIX_DELETE_GALOIS_KEY_FAILURE,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_REQUEST,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_FAILURE,
  MORFIX_SET_ACTIVE_SECRET_KEY_REQUEST,
  MORFIX_SET_ACTIVE_SECRET_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_SECRET_KEY_FAILURE,
  MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST,
  MORFIX_SET_ACTIVE_RELIN_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_RELIN_KEY_FAILURE,
  MORFIX_SET_ACTIVE_GALOIS_KEY_REQUEST,
  MORFIX_SET_ACTIVE_GALOIS_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_GALOIS_KEY_FAILURE,
  MORFIX_GENERATE_PUBLIC_KEY_REQUEST,
  MORFIX_GENERATE_PUBLIC_KEY_SUCCESS,
  MORFIX_GENERATE_PUBLIC_KEY_FAILURE,
  MORFIX_GENERATE_SECRET_KEY_REQUEST,
  MORFIX_GENERATE_SECRET_KEY_SUCCESS,
  MORFIX_GENERATE_SECRET_KEY_FAILURE,
  MORFIX_GENERATE_RELIN_KEY_REQUEST,
  MORFIX_GENERATE_RELIN_KEY_SUCCESS,
  MORFIX_GENERATE_RELIN_KEY_FAILURE,
  MORFIX_GENERATE_GALOIS_KEY_REQUEST,
  MORFIX_GENERATE_GALOIS_KEY_SUCCESS,
  MORFIX_GENERATE_GALOIS_KEY_FAILURE,
  MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_DOWNLOAD_PUBLIC_KEY_SUCCESS,
  MORFIX_DOWNLOAD_PUBLIC_KEY_FAILURE,
  MORFIX_DOWNLOAD_SECRET_KEY_REQUEST,
  MORFIX_DOWNLOAD_SECRET_KEY_SUCCESS,
  MORFIX_DOWNLOAD_SECRET_KEY_FAILURE,
  MORFIX_DOWNLOAD_RELIN_KEY_REQUEST,
  MORFIX_DOWNLOAD_RELIN_KEY_SUCCESS,
  MORFIX_DOWNLOAD_RELIN_KEY_FAILURE,
  MORFIX_DOWNLOAD_GALOIS_KEY_REQUEST,
  MORFIX_DOWNLOAD_GALOIS_KEY_SUCCESS,
  MORFIX_DOWNLOAD_GALOIS_KEY_FAILURE,
  MORFIX_UPLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_UPLOAD_PUBLIC_KEY_SUCCESS,
  MORFIX_UPLOAD_PUBLIC_KEY_FAILURE,
  MORFIX_UPLOAD_SECRET_KEY_REQUEST,
  MORFIX_UPLOAD_SECRET_KEY_SUCCESS,
  MORFIX_UPLOAD_SECRET_KEY_FAILURE,
  MORFIX_UPLOAD_RELIN_KEY_REQUEST,
  MORFIX_UPLOAD_RELIN_KEY_SUCCESS,
  MORFIX_UPLOAD_RELIN_KEY_FAILURE,
  MORFIX_UPLOAD_GALOIS_KEY_REQUEST,
  MORFIX_UPLOAD_GALOIS_KEY_SUCCESS,
  MORFIX_UPLOAD_GALOIS_KEY_FAILURE,
  MORFIX_CREATE_INTEGER_ENCODER_REQUEST,
  MORFIX_CREATE_INTEGER_ENCODER_SUCCESS,
  MORFIX_CREATE_INTEGER_ENCODER_FAILURE,
  MORFIX_CREATE_BATCH_ENCODER_REQUEST,
  MORFIX_CREATE_BATCH_ENCODER_SUCCESS,
  MORFIX_CREATE_BATCH_ENCODER_FAILURE,
  MORFIX_CREATE_CKKS_ENCODER_REQUEST,
  MORFIX_CREATE_CKKS_ENCODER_SUCCESS,
  MORFIX_CREATE_CKKS_ENCODER_FAILURE,
  MORFIX_CREATE_ENCRYPTOR_REQUEST,
  MORFIX_CREATE_ENCRYPTOR_SUCCESS,
  MORFIX_CREATE_ENCRYPTOR_FAILURE,
  MORFIX_CREATE_DECRYPTOR_REQUEST,
  MORFIX_CREATE_DECRYPTOR_SUCCESS,
  MORFIX_CREATE_DECRYPTOR_FAILURE,
  MORFIX_DELETE_ENCRYPTOR_REQUEST,
  MORFIX_DELETE_ENCRYPTOR_SUCCESS,
  MORFIX_DELETE_ENCRYPTOR_FAILURE,
  MORFIX_DELETE_DECRYPTOR_REQUEST,
  MORFIX_DELETE_DECRYPTOR_SUCCESS,
  MORFIX_DELETE_DECRYPTOR_FAILURE,
  MORFIX_CREATE_EVALUATOR_REQUEST,
  MORFIX_CREATE_EVALUATOR_SUCCESS,
  MORFIX_CREATE_EVALUATOR_FAILURE,
  MORFIX_BATCH_ENCODE_INT32_REQUEST,
  MORFIX_BATCH_ENCODE_INT32_SUCCESS,
  MORFIX_BATCH_ENCODE_INT32_FAILURE,
  MORFIX_BATCH_ENCODE_UINT32_REQUEST,
  MORFIX_BATCH_ENCODE_UINT32_SUCCESS,
  MORFIX_BATCH_ENCODE_UINT32_FAILURE,
  MORFIX_CKKS_ENCODE_FLOAT64_REQUEST,
  MORFIX_CKKS_ENCODE_FLOAT64_SUCCESS,
  MORFIX_CKKS_ENCODE_FLOAT64_FAILURE,
  MORFIX_BATCH_DECODE_INT32_REQUEST,
  MORFIX_BATCH_DECODE_INT32_SUCCESS,
  MORFIX_BATCH_DECODE_INT32_FAILURE,
  MORFIX_BATCH_DECODE_UINT32_REQUEST,
  MORFIX_BATCH_DECODE_UINT32_SUCCESS,
  MORFIX_BATCH_DECODE_UINT32_FAILURE,
  MORFIX_CKKS_DECODE_FLOAT64_REQUEST,
  MORFIX_CKKS_DECODE_FLOAT64_SUCCESS,
  MORFIX_CKKS_DECODE_FLOAT64_FAILURE,
  MORFIX_ENCRYPT_REQUEST,
  MORFIX_ENCRYPT_SUCCESS,
  MORFIX_ENCRYPT_FAILURE,
  MORFIX_DECRYPT_REQUEST,
  MORFIX_DECRYPT_SUCCESS,
  MORFIX_DECRYPT_FAILURE,
  MORFIX_CREATE_PLAIN_TEXT_REQUEST,
  MORFIX_CREATE_PLAIN_TEXT_SUCCESS,
  MORFIX_CREATE_PLAIN_TEXT_FAILURE,
  MORFIX_READ_PLAIN_TEXT_REQUEST,
  MORFIX_READ_PLAIN_TEXT_SUCCESS,
  MORFIX_READ_PLAIN_TEXT_FAILURE,
  MORFIX_UPDATE_PLAIN_TEXT_REQUEST,
  MORFIX_UPDATE_PLAIN_TEXT_SUCCESS,
  MORFIX_UPDATE_PLAIN_TEXT_FAILURE,
  MORFIX_DELETE_PLAIN_TEXT_REQUEST,
  MORFIX_DELETE_PLAIN_TEXT_SUCCESS,
  MORFIX_DELETE_PLAIN_TEXT_FAILURE,
  MORFIX_DOWNLOAD_PLAIN_TEXT_REQUEST,
  MORFIX_DOWNLOAD_PLAIN_TEXT_SUCCESS,
  MORFIX_DOWNLOAD_PLAIN_TEXT_FAILURE,
  MORFIX_UPLOAD_PLAIN_TEXT_REQUEST,
  MORFIX_UPLOAD_PLAIN_TEXT_SUCCESS,
  MORFIX_UPLOAD_PLAIN_TEXT_FAILURE,
  MORFIX_LOAD_PLAIN_TEXT_REQUEST,
  MORFIX_LOAD_PLAIN_TEXT_SUCCESS,
  MORFIX_LOAD_PLAIN_TEXT_FAILURE,
  MORFIX_CREATE_CIPHER_TEXT_REQUEST,
  MORFIX_CREATE_CIPHER_TEXT_SUCCESS,
  MORFIX_CREATE_CIPHER_TEXT_FAILURE,
  MORFIX_READ_CIPHER_TEXT_REQUEST,
  MORFIX_READ_CIPHER_TEXT_SUCCESS,
  MORFIX_READ_CIPHER_TEXT_FAILURE,
  MORFIX_UPDATE_CIPHER_TEXT_REQUEST,
  MORFIX_UPDATE_CIPHER_TEXT_SUCCESS,
  MORFIX_UPDATE_CIPHER_TEXT_FAILURE,
  MORFIX_DELETE_CIPHER_TEXT_REQUEST,
  MORFIX_DELETE_CIPHER_TEXT_SUCCESS,
  MORFIX_DELETE_CIPHER_TEXT_FAILURE,
  MORFIX_DOWNLOAD_CIPHER_TEXT_REQUEST,
  MORFIX_DOWNLOAD_CIPHER_TEXT_SUCCESS,
  MORFIX_DOWNLOAD_CIPHER_TEXT_FAILURE,
  MORFIX_UPLOAD_CIPHER_TEXT_REQUEST,
  MORFIX_UPLOAD_CIPHER_TEXT_SUCCESS,
  MORFIX_UPLOAD_CIPHER_TEXT_FAILURE,
  MORFIX_LOAD_CIPHER_TEXT_REQUEST,
  MORFIX_LOAD_CIPHER_TEXT_SUCCESS,
  MORFIX_LOAD_CIPHER_TEXT_FAILURE,
  MORFIX_ENGINE_CREATE_ACTION_REQUEST,
  MORFIX_ENGINE_CREATE_ACTION_SUCCESS,
  MORFIX_ENGINE_CREATE_ACTION_FAILURE,
  MORFIX_ENGINE_UPDATE_ACTION_REQUEST,
  MORFIX_ENGINE_UPDATE_ACTION_SUCCESS,
  MORFIX_ENGINE_UPDATE_ACTION_FAILURE,
  MORFIX_ENGINE_DELETE_ACTION_REQUEST,
  MORFIX_ENGINE_DELETE_ACTION_SUCCESS,
  MORFIX_ENGINE_DELETE_ACTION_FAILURE,
  MORFIX_EVALUATE_NEGATE_CIPHER_REQUEST,
  MORFIX_EVALUATE_NEGATE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_NEGATE_CIPHER_FAILURE,
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_REQUEST,
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_SUCCESS,
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_FAILURE,
  MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_REQUEST,
  MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_SUCCESS,
  MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_FAILURE,
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_REQUEST,
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_SUCCESS,
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_FAILURE,
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_REQUEST,
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_SUCCESS,
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_FAILURE,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_REQUEST,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_SUCCESS,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_FAILURE,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_SUCCESS,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_FAILURE,
  MORFIX_EVALUATE_SQUARE_CIPHER_REQUEST,
  MORFIX_EVALUATE_SQUARE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_SQUARE_CIPHER_FAILURE,
  MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST,
  MORFIX_EVALUATE_RELINEARIZE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_RELINEARIZE_CIPHER_FAILURE,
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_REQUEST,
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_FAILURE,
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_FAILURE,
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_SUCCESS,
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_FAILURE,
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_FAILURE,
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_REQUEST,
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_SUCCESS,
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_FAILURE,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_REQUEST,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_FAILURE,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_REQUEST,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_FAILURE,
  MORFIX_EVALUATE_ROTATE_ROWS_REQUEST,
  MORFIX_EVALUATE_ROTATE_ROWS_SUCCESS,
  MORFIX_EVALUATE_ROTATE_ROWS_FAILURE,
  MORFIX_EVALUATE_ROTATE_COLUMNS_REQUEST,
  MORFIX_EVALUATE_ROTATE_COLUMNS_SUCCESS,
  MORFIX_EVALUATE_ROTATE_COLUMNS_FAILURE,
  MORFIX_EVALUATE_ROTATE_VECTOR_REQUEST,
  MORFIX_EVALUATE_ROTATE_VECTOR_SUCCESS,
  MORFIX_EVALUATE_ROTATE_VECTOR_FAILURE,
  MORFIX_EVALUATE_COMPLEX_CONJUGATE_REQUEST,
  MORFIX_EVALUATE_COMPLEX_CONJUGATE_SUCCESS,
  MORFIX_EVALUATE_COMPLEX_CONJUGATE_FAILURE,
  MORFIX_EVALUATE_SUM_ELEMENTS_REQUEST,
  MORFIX_EVALUATE_SUM_ELEMENTS_SUCCESS,
  MORFIX_EVALUATE_SUM_ELEMENTS_FAILURE,
  MORFIX_EVALUATE_DOT_PRODUCT_REQUEST,
  MORFIX_EVALUATE_DOT_PRODUCT_SUCCESS,
  MORFIX_EVALUATE_DOT_PRODUCT_FAILURE,
  MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_REQUEST,
  MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_SUCCESS,
  MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_FAILURE
} from 'store/constants/morfix'

import { LOGOUT_USER_SUCCESS } from 'store/constants/session'

import { ACTION_STATUS } from 'shared/constants'

import { removeKey } from './util'

export const initialState = {
  request: {
    message: '',
    loading: false,
    statusCode: 0
  },
  singletons: {
    encParms: null,
    context: null,
    keyGenerator: null,
    integerEncoder: null,
    batchEncoder: null,
    ckksEncoder: null,
    encryptor: null,
    decryptor: null,
    evaluator: null
  },
  plainText: {
    byId: {},
    allIds: []
  },
  cipherText: {
    byId: {},
    allIds: []
  },
  keys: {
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
  },
  actions: {
    allIds: [],
    byId: {}
  }
}

export default createReducer(initialState, {
  [MORFIX_CREATE_ENC_PARMS_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      singletons: {
        ...state.singletons,
        encParms: null,
        context: null,
        keyGenerator: null,
        integerEncoder: null,
        batchEncoder: null,
        ckksEncoder: null,
        encryptor: null,
        decryptor: null,
        evaluator: null
      }
    }
  },
  [MORFIX_CREATE_ENC_PARMS_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        encParms: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_ENC_PARMS_FAILURE]: setFailureState,
  [MORFIX_CREATE_CONTEXT_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      singletons: {
        ...state.singletons,
        context: null,
        keyGenerator: null,
        integerEncoder: null,
        batchEncoder: null,
        ckksEncoder: null,
        encryptor: null,
        decryptor: null,
        evaluator: null
      }
    }
  },
  [MORFIX_CREATE_CONTEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        context: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_CONTEXT_FAILURE]: setFailureState,
  [MORFIX_CREATE_KEY_GENERATOR_REQUEST]: setRequestState,
  [MORFIX_CREATE_KEY_GENERATOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        keyGenerator: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_KEY_GENERATOR_FAILURE]: setFailureState,
  [MORFIX_DELETE_PUBLIC_KEY_REQUEST]: setRequestState,
  [MORFIX_DELETE_PUBLIC_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        public: {
          activeId: state.keys.public.activeId === action.payload.id ? '' : state.keys.public.activeId,
          allIds: state.keys.public.allIds.filter(id => id !== action.payload.id),
          byId: removeKey(action.payload.id, state.keys.public.byId)
        }
      }
    }
  },
  [MORFIX_DELETE_PUBLIC_KEY_FAILURE]: setFailureState,
  [MORFIX_DELETE_SECRET_KEY_REQUEST]: setRequestState,
  [MORFIX_DELETE_SECRET_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        secret: {
          activeId: state.keys.secret.activeId === action.payload.id ? '' : state.keys.secret.activeId,
          allIds: state.keys.secret.allIds.filter(id => id !== action.payload.id),
          byId: removeKey(action.payload.id, state.keys.secret.byId)
        }
      }
    }
  },
  [MORFIX_DELETE_SECRET_KEY_FAILURE]: setFailureState,
  [MORFIX_DELETE_RELIN_KEY_REQUEST]: setRequestState,
  [MORFIX_DELETE_RELIN_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        relin: {
          activeId: state.keys.relin.activeId === action.payload.id ? '' : state.keys.relin.activeId,
          allIds: state.keys.relin.allIds.filter(id => id !== action.payload.id),
          byId: removeKey(action.payload.id, state.keys.relin.byId)
        }
      }
    }
  },
  [MORFIX_DELETE_RELIN_KEY_FAILURE]: setFailureState,
  [MORFIX_DELETE_GALOIS_KEY_REQUEST]: setRequestState,
  [MORFIX_DELETE_GALOIS_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        galois: {
          activeId: state.keys.galois.activeId === action.payload.id ? '' : state.keys.galois.activeId,
          allIds: state.keys.galois.allIds.filter(id => id !== action.payload.id),
          byId: removeKey(action.payload.id, state.keys.galois.byId)
        }
      }
    }
  },
  [MORFIX_DELETE_GALOIS_KEY_FAILURE]: setFailureState,
  [MORFIX_SET_ACTIVE_PUBLIC_KEY_REQUEST]: setRequestState,
  [MORFIX_SET_ACTIVE_PUBLIC_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        public: {
          ...state.keys.public,
          activeId: action.payload.id
        }
      }
    }
  },
  [MORFIX_SET_ACTIVE_PUBLIC_KEY_FAILURE]: setFailureState,
  [MORFIX_SET_ACTIVE_SECRET_KEY_REQUEST]: setRequestState,
  [MORFIX_SET_ACTIVE_SECRET_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        secret: {
          ...state.keys.secret,
          activeId: action.payload.id
        }
      }
    }
  },
  [MORFIX_SET_ACTIVE_SECRET_KEY_FAILURE]: setFailureState,
  [MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST]: setRequestState,
  [MORFIX_SET_ACTIVE_RELIN_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        relin: {
          ...state.keys.relin,
          activeId: action.payload.id
        }
      }
    }
  },
  [MORFIX_SET_ACTIVE_RELIN_KEY_FAILURE]: setFailureState,
  [MORFIX_SET_ACTIVE_GALOIS_KEY_REQUEST]: setRequestState,
  [MORFIX_SET_ACTIVE_GALOIS_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        galois: {
          ...state.keys.galois,
          activeId: action.payload.id
        }
      }
    }
  },
  [MORFIX_SET_ACTIVE_GALOIS_KEY_FAILURE]: setFailureState,
  [MORFIX_GENERATE_PUBLIC_KEY_REQUEST]: setRequestState,
  [MORFIX_GENERATE_PUBLIC_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        public: {
          activeId: action.payload.id,
          byId: {
            ...state.keys.public.byId,
            [action.payload.id]: action.payload
          },
          allIds: [...state.keys.public.allIds, action.payload.id]
        }
      }
    }
  },
  [MORFIX_GENERATE_PUBLIC_KEY_FAILURE]: setFailureState,
  [MORFIX_GENERATE_SECRET_KEY_REQUEST]: setRequestState,
  [MORFIX_GENERATE_SECRET_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        secret: {
          activeId: action.payload.id,
          byId: {
            ...state.keys.secret.byId,
            [action.payload.id]: action.payload
          },
          allIds: [...state.keys.secret.allIds, action.payload.id]
        }
      }
    }
  },
  [MORFIX_GENERATE_SECRET_KEY_FAILURE]: setFailureState,
  [MORFIX_GENERATE_RELIN_KEY_REQUEST]: setRequestState,
  [MORFIX_GENERATE_RELIN_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        relin: {
          activeId: action.payload.id,
          byId: {
            ...state.keys.relin.byId,
            [action.payload.id]: action.payload
          },
          allIds: [...state.keys.relin.allIds, action.payload.id]
        }
      }
    }
  },
  [MORFIX_GENERATE_RELIN_KEY_FAILURE]: setFailureState,
  [MORFIX_GENERATE_GALOIS_KEY_REQUEST]: setRequestState,
  [MORFIX_GENERATE_GALOIS_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        galois: {
          activeId: action.payload.id,
          byId: {
            ...state.keys.galois.byId,
            [action.payload.id]: action.payload
          },
          allIds: [...state.keys.galois.allIds, action.payload.id]
        }
      }
    }
  },
  [MORFIX_GENERATE_GALOIS_KEY_FAILURE]: setFailureState,
  [MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      keys: {
        ...state.keys,
        public: {
          activeId: state.keys.public.activeId,
          allIds: state.keys.public.allIds,
          byId: {
            ...state.keys.public.byId,
            [action.payload.id]: {
              ...state.keys.public.byId[action.payload.id],
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_PUBLIC_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        public: {
          activeId: state.keys.public.activeId,
          allIds: state.keys.public.allIds,
          byId: {
            ...state.keys.public.byId,
            [action.payload.id]: {
              ...state.keys.public.byId[action.payload.id],
              download: action.payload.link
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_PUBLIC_KEY_FAILURE]: setFailureState,
  [MORFIX_DOWNLOAD_SECRET_KEY_REQUEST]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      keys: {
        ...state.keys,
        secret: {
          activeId: state.keys.secret.activeId,
          allIds: state.keys.secret.allIds,
          byId: {
            ...state.keys.secret.byId,
            [action.payload.id]: {
              ...state.keys.secret.byId[action.payload.id],
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_SECRET_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        secret: {
          activeId: state.keys.secret.activeId,
          allIds: state.keys.secret.allIds,
          byId: {
            ...state.keys.secret.byId,
            [action.payload.id]: {
              ...state.keys.secret.byId[action.payload.id],
              download: action.payload.link
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_SECRET_KEY_FAILURE]: setFailureState,
  [MORFIX_DOWNLOAD_RELIN_KEY_REQUEST]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      keys: {
        ...state.keys,
        relin: {
          activeId: state.keys.relin.activeId,
          allIds: state.keys.relin.allIds,
          byId: {
            ...state.keys.relin.byId,
            [action.payload.id]: {
              ...state.keys.relin.byId[action.payload.id],
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_RELIN_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        relin: {
          activeId: state.keys.relin.activeId,
          allIds: state.keys.relin.allIds,
          byId: {
            ...state.keys.relin.byId,
            [action.payload.id]: {
              ...state.keys.relin.byId[action.payload.id],
              download: action.payload.link
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_RELIN_KEY_FAILURE]: setFailureState,
  [MORFIX_DOWNLOAD_GALOIS_KEY_REQUEST]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      keys: {
        ...state.keys,
        galois: {
          activeId: state.keys.galois.activeId,
          allIds: state.keys.galois.allIds,
          byId: {
            ...state.keys.galois.byId,
            [action.payload.id]: {
              ...state.keys.galois.byId[action.payload.id],
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_GALOIS_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        galois: {
          activeId: state.keys.galois.activeId,
          allIds: state.keys.galois.allIds,
          byId: {
            ...state.keys.galois.byId,
            [action.payload.id]: {
              ...state.keys.galois.byId[action.payload.id],
              download: action.payload.link
            }
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_GALOIS_KEY_FAILURE]: setFailureState,
  [MORFIX_UPLOAD_PUBLIC_KEY_REQUEST]: setRequestState,
  [MORFIX_UPLOAD_PUBLIC_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        public: {
          activeId: action.payload.id,
          allIds: [...state.keys.public.allIds, action.payload.id],
          byId: {
            ...state.keys.public.byId,
            [action.payload.id]: {
              id: action.payload.id,
              name: action.payload.name,
              uploaded: true,
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_UPLOAD_PUBLIC_KEY_FAILURE]: setFailureState,
  [MORFIX_UPLOAD_SECRET_KEY_REQUEST]: setRequestState,
  [MORFIX_UPLOAD_SECRET_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        secret: {
          activeId: action.payload.id,
          allIds: [...state.keys.secret.allIds, action.payload.id],
          byId: {
            ...state.keys.secret.byId,
            [action.payload.id]: {
              id: action.payload.id,
              name: action.payload.name,
              uploaded: true,
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_UPLOAD_SECRET_KEY_FAILURE]: setFailureState,
  [MORFIX_UPLOAD_RELIN_KEY_REQUEST]: setRequestState,
  [MORFIX_UPLOAD_RELIN_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        relin: {
          activeId: action.payload.id,
          allIds: [...state.keys.relin.allIds, action.payload.id],
          byId: {
            ...state.keys.relin.byId,
            [action.payload.id]: {
              id: action.payload.id,
              name: action.payload.name,
              uploaded: true,
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_UPLOAD_RELIN_KEY_FAILURE]: setFailureState,
  [MORFIX_UPLOAD_GALOIS_KEY_REQUEST]: setRequestState,
  [MORFIX_UPLOAD_GALOIS_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      keys: {
        ...state.keys,
        galois: {
          activeId: action.payload.id,
          allIds: [...state.keys.galois.allIds, action.payload.id],
          byId: {
            ...state.keys.galois.byId,
            [action.payload.id]: {
              id: action.payload.id,
              name: action.payload.name,
              uploaded: true,
              download: ''
            }
          }
        }
      }
    }
  },
  [MORFIX_UPLOAD_GALOIS_KEY_FAILURE]: setFailureState,
  [MORFIX_CREATE_INTEGER_ENCODER_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      singletons: {
        ...state.singletons,
        integerEncoder: null
      }
    }
  },
  [MORFIX_CREATE_INTEGER_ENCODER_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        integerEncoder: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_INTEGER_ENCODER_FAILURE]: setFailureState,
  [MORFIX_CREATE_BATCH_ENCODER_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      singletons: {
        ...state.singletons,
        batchEncoder: null
      }
    }
  },
  [MORFIX_CREATE_BATCH_ENCODER_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        batchEncoder: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_BATCH_ENCODER_FAILURE]: setFailureState,
  [MORFIX_CREATE_CKKS_ENCODER_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      singletons: {
        ...state.singletons,
        ckksEncoder: null
      }
    }
  },
  [MORFIX_CREATE_CKKS_ENCODER_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        ckksEncoder: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_CKKS_ENCODER_FAILURE]: setFailureState,
  [MORFIX_CREATE_ENCRYPTOR_REQUEST]: setRequestState,
  [MORFIX_CREATE_ENCRYPTOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        encryptor: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_ENCRYPTOR_FAILURE]: setFailureState,
  [MORFIX_CREATE_DECRYPTOR_REQUEST]: setRequestState,
  [MORFIX_CREATE_DECRYPTOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        decryptor: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_DECRYPTOR_FAILURE]: setFailureState,
  [MORFIX_DELETE_ENCRYPTOR_REQUEST]: setRequestState,
  [MORFIX_DELETE_ENCRYPTOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        encryptor: null
      }
    }
  },
  [MORFIX_DELETE_ENCRYPTOR_FAILURE]: setFailureState,
  [MORFIX_DELETE_DECRYPTOR_REQUEST]: setRequestState,
  [MORFIX_DELETE_DECRYPTOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        decryptor: null
      }
    }
  },
  [MORFIX_DELETE_DECRYPTOR_FAILURE]: setFailureState,
  [MORFIX_CREATE_EVALUATOR_REQUEST]: state => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      singletons: {
        ...state.singletons,
        evaluator: null
      }
    }
  },
  [MORFIX_CREATE_EVALUATOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      singletons: {
        ...state.singletons,
        evaluator: action.payload.id
      }
    }
  },
  [MORFIX_CREATE_PLAIN_TEXT_REQUEST]: setRequestState,
  [MORFIX_CREATE_PLAIN_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        allIds: state.plainText.byId[action.payload.id]
          ? [...state.plainText.allIds]
          : [...state.plainText.allIds, action.payload.id],
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: action.payload
        }
      }
    }
  },
  [MORFIX_CREATE_PLAIN_TEXT_FAILURE]: setFailureState,
  [MORFIX_READ_PLAIN_TEXT_REQUEST]: setRequestState,
  [MORFIX_READ_PLAIN_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        allIds: [...state.plainText.allIds],
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: action.payload
        }
      }
    }
  },
  [MORFIX_READ_PLAIN_TEXT_FAILURE]: setFailureState,
  [MORFIX_UPDATE_PLAIN_TEXT_REQUEST]: setRequestState,
  [MORFIX_UPDATE_PLAIN_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        allIds: state.plainText.allIds,
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...state.plainText.byId[action.payload.id],
            ...action.payload
          }
        }
      }
    }
  },
  [MORFIX_UPDATE_PLAIN_TEXT_FAILURE]: setFailureState,
  [MORFIX_DELETE_PLAIN_TEXT_REQUEST]: setRequestState,
  [MORFIX_DELETE_PLAIN_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        allIds: state.plainText.allIds.filter(id => id !== action.payload.id),
        byId: removeKey(action.payload.id, state.plainText.byId)
      }
    }
  },
  [MORFIX_DELETE_PLAIN_TEXT_FAILURE]: setFailureState,
  [MORFIX_DOWNLOAD_PLAIN_TEXT_REQUEST]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      plainText: {
        allIds: state.plainText.allIds,
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...state.plainText.byId[action.payload.id],
            download: ''
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_PLAIN_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        allIds: state.plainText.allIds,
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...state.plainText.byId[action.payload.id],
            download: action.payload.link
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_PLAIN_TEXT_FAILURE]: setFailureState,
  [MORFIX_UPLOAD_PLAIN_TEXT_REQUEST]: setRequestState,
  [MORFIX_UPLOAD_PLAIN_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        allIds: [...state.plainText.allIds, action.payload.id],
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            id: action.payload.id,
            name: action.payload.name,
            uploaded: true,
            download: ''
          }
        }
      }
    }
  },
  [MORFIX_UPLOAD_PLAIN_TEXT_FAILURE]: setFailureState,
  [MORFIX_LOAD_PLAIN_TEXT_REQUEST]: setRequestState,
  [MORFIX_LOAD_PLAIN_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        allIds: state.plainText.byId[action.payload.id]
          ? [...state.plainText.allIds]
          : [...state.plainText.allIds, action.payload.id],
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...action.payload
          }
        }
      }
    }
  },
  [MORFIX_LOAD_PLAIN_TEXT_FAILURE]: setFailureState,
  [MORFIX_CREATE_CIPHER_TEXT_REQUEST]: setRequestState,
  [MORFIX_CREATE_CIPHER_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        allIds: state.cipherText.byId[action.payload.id]
          ? [...state.cipherText.allIds]
          : [...state.cipherText.allIds, action.payload.id],
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: action.payload
        }
      }
    }
  },
  [MORFIX_CREATE_CIPHER_TEXT_FAILURE]: setFailureState,
  [MORFIX_READ_CIPHER_TEXT_REQUEST]: setRequestState,
  [MORFIX_READ_CIPHER_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        allIds: [...state.cipherText.allIds],
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: action.payload
        }
      }
    }
  },
  [MORFIX_READ_CIPHER_TEXT_FAILURE]: setFailureState,
  [MORFIX_UPDATE_CIPHER_TEXT_REQUEST]: setRequestState,
  [MORFIX_UPDATE_CIPHER_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        allIds: state.cipherText.allIds,
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: {
            ...state.cipherText.byId[action.payload.id],
            ...action.payload
          }
        }
      }
    }
  },
  [MORFIX_UPDATE_CIPHER_TEXT_FAILURE]: setFailureState,
  [MORFIX_DELETE_CIPHER_TEXT_REQUEST]: setRequestState,
  [MORFIX_DELETE_CIPHER_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        allIds: state.cipherText.allIds.filter(id => id !== action.payload.id),
        byId: removeKey(action.payload.id, state.cipherText.byId)
      }
    }
  },
  [MORFIX_DELETE_CIPHER_TEXT_FAILURE]: setFailureState,
  [MORFIX_DOWNLOAD_CIPHER_TEXT_REQUEST]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: true,
        statusCode: 0
      },
      cipherText: {
        allIds: state.cipherText.allIds,
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: {
            ...state.cipherText.byId[action.payload.id],
            download: ''
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_CIPHER_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        allIds: state.cipherText.allIds,
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: {
            ...state.cipherText.byId[action.payload.id],
            download: action.payload.link
          }
        }
      }
    }
  },
  [MORFIX_DOWNLOAD_CIPHER_TEXT_FAILURE]: setFailureState,
  [MORFIX_UPLOAD_CIPHER_TEXT_REQUEST]: setRequestState,
  [MORFIX_UPLOAD_CIPHER_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        allIds: [...state.cipherText.allIds, action.payload.id],
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: {
            id: action.payload.id,
            name: action.payload.name,
            uploaded: true,
            download: ''
          }
        }
      }
    }
  },
  [MORFIX_UPLOAD_CIPHER_TEXT_FAILURE]: setFailureState,
  [MORFIX_LOAD_CIPHER_TEXT_REQUEST]: setRequestState,
  [MORFIX_LOAD_CIPHER_TEXT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        allIds: state.cipherText.byId[action.payload.id]
          ? [...state.cipherText.allIds]
          : [...state.cipherText.allIds, action.payload.id],
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: {
            ...action.payload
          }
        }
      }
    }
  },
  [MORFIX_LOAD_CIPHER_TEXT_FAILURE]: setFailureState,
  [MORFIX_CREATE_EVALUATOR_FAILURE]: setFailureState,
  [MORFIX_BATCH_ENCODE_INT32_REQUEST]: setRequestAndActionState,
  [MORFIX_BATCH_ENCODE_INT32_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_BATCH_ENCODE_INT32_FAILURE]: setFailureState,
  [MORFIX_BATCH_ENCODE_UINT32_REQUEST]: setRequestAndActionState,
  [MORFIX_BATCH_ENCODE_UINT32_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_BATCH_ENCODE_UINT32_FAILURE]: setFailureState,
  [MORFIX_CKKS_ENCODE_FLOAT64_REQUEST]: setRequestAndActionState,
  [MORFIX_CKKS_ENCODE_FLOAT64_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_CKKS_ENCODE_FLOAT64_FAILURE]: setFailureState,
  [MORFIX_BATCH_DECODE_INT32_REQUEST]: setRequestAndActionState,
  [MORFIX_BATCH_DECODE_INT32_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        ...state.plainText,
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...state.plainText.byId[action.payload.id],
            ...action.payload
          }
        }
      },
      actions: {
        ...state.actions,
        byId: {
          ...state.actions.byId,
          [action.payload.actionId]: {
            ...state.actions.byId[action.payload.actionId],
            status: ACTION_STATUS.SUCCESS
          }
        }
      }
    }
  },
  [MORFIX_BATCH_DECODE_INT32_FAILURE]: setFailureState,
  [MORFIX_BATCH_DECODE_UINT32_REQUEST]: setRequestAndActionState,
  [MORFIX_BATCH_DECODE_UINT32_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        ...state.plainText,
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...state.plainText.byId[action.payload.id],
            ...action.payload
          }
        }
      },
      actions: {
        ...state.actions,
        byId: {
          ...state.actions.byId,
          [action.payload.actionId]: {
            ...state.actions.byId[action.payload.actionId],
            status: ACTION_STATUS.SUCCESS
          }
        }
      }
    }
  },
  [MORFIX_BATCH_DECODE_UINT32_FAILURE]: setFailureState,
  [MORFIX_CKKS_DECODE_FLOAT64_REQUEST]: setRequestAndActionState,
  [MORFIX_CKKS_DECODE_FLOAT64_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        ...state.plainText,
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...state.plainText.byId[action.payload.id],
            ...action.payload
          }
        }
      },
      actions: {
        allIds: state.actions.allIds,
        byId: {
          ...state.actions.byId,
          [action.payload.actionId]: {
            ...state.actions.byId[action.payload.actionId],
            status: ACTION_STATUS.SUCCESS
          }
        }
      }
    }
  },
  [MORFIX_CKKS_DECODE_FLOAT64_FAILURE]: setFailureState,
  [MORFIX_ENCRYPT_REQUEST]: setRequestAndActionState,
  [MORFIX_ENCRYPT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      cipherText: {
        ...state.cipherText,
        byId: {
          ...state.cipherText.byId,
          [action.payload.id]: {
            ...state.cipherText.byId[action.payload.id],
            ...action.payload
          }
        }
      },
      actions: {
        allIds: state.actions.allIds,
        byId: {
          ...state.actions.byId,
          [action.payload.actionId]: {
            ...state.actions.byId[action.payload.actionId],
            status: ACTION_STATUS.SUCCESS
          }
        }
      }
    }
  },
  [MORFIX_ENCRYPT_FAILURE]: setFailureState,
  [MORFIX_DECRYPT_REQUEST]: setRequestAndActionState,
  [MORFIX_DECRYPT_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      plainText: {
        ...state.plainText,
        byId: {
          ...state.plainText.byId,
          [action.payload.id]: {
            ...state.plainText.byId[action.payload.id],
            ...action.payload
          }
        }
      },
      actions: {
        ...state.actions,
        byId: {
          ...state.actions.byId,
          [action.payload.actionId]: {
            ...state.actions.byId[action.payload.actionId],
            status: ACTION_STATUS.SUCCESS
          }
        }
      }
    }
  },
  [MORFIX_DECRYPT_FAILURE]: setFailureState,
  [MORFIX_ENGINE_CREATE_ACTION_REQUEST]: setRequestAndActionState,
  [MORFIX_ENGINE_CREATE_ACTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      actions: {
        allIds: [...state.actions.allIds, action.payload.actionId],
        byId: {
          ...state.actions.byId,
          [action.payload.actionId]: action.payload
        }
      }
    }
  },
  [MORFIX_ENGINE_CREATE_ACTION_FAILURE]: setFailureState,
  [MORFIX_ENGINE_UPDATE_ACTION_REQUEST]: setRequestAndActionState,
  [MORFIX_ENGINE_UPDATE_ACTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      actions: {
        allIds: state.actions.allIds,
        byId: {
          ...state.actions.byId,
          [action.payload.actionId]: {
            ...state.actions.byId[action.payload.actionId],
            ...action.payload
          }
        }
      }
    }
  },
  [MORFIX_ENGINE_UPDATE_ACTION_FAILURE]: setFailureState,
  [MORFIX_ENGINE_DELETE_ACTION_REQUEST]: setRequestAndActionState,
  [MORFIX_ENGINE_DELETE_ACTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      request: {
        ...state.request,
        loading: false,
        statusCode: (action.payload && action.payload.statusCode) || 200
      },
      actions: {
        allIds: state.actions.allIds.filter(id => id !== action.payload.actionId),
        byId: removeKey(action.payload.actionId, state.actions.byId)
      }
    }
  },
  [MORFIX_ENGINE_DELETE_ACTION_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_NEGATE_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_NEGATE_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_NEGATE_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_SQUARE_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_SQUARE_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_SQUARE_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_RELINEARIZE_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_RELINEARIZE_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_EXPONENTIATE_CIPHER_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_EXPONENTIATE_CIPHER_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_EXPONENTIATE_CIPHER_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_ROTATE_ROWS_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_ROTATE_ROWS_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_ROTATE_ROWS_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_ROTATE_COLUMNS_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_ROTATE_COLUMNS_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_ROTATE_COLUMNS_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_ROTATE_VECTOR_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_ROTATE_VECTOR_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_ROTATE_VECTOR_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_COMPLEX_CONJUGATE_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_COMPLEX_CONJUGATE_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_COMPLEX_CONJUGATE_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_SUM_ELEMENTS_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_SUM_ELEMENTS_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_SUM_ELEMENTS_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_DOT_PRODUCT_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_DOT_PRODUCT_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_DOT_PRODUCT_FAILURE]: setFailureState,
  [MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_REQUEST]: setRequestAndActionState,
  [MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_SUCCESS]: setSuccessAndUpdateActionState,
  [MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_FAILURE]: setFailureState,
  [LOGOUT_USER_SUCCESS]: clearSessionState
})

function clearSessionState() {
  return {
    ...initialState
  }
}

function setRequestState(state) {
  return {
    ...state,
    request: {
      ...state.request,
      loading: true,
      statusCode: 0
    }
  }
}

function setRequestAndActionState(state, action) {
  return {
    ...state,
    request: {
      ...state.request,
      loading: true,
      statusCode: 0
    },
    actions: {
      allIds: state.actions.allIds,
      byId: {
        ...state.actions.byId,
        [action.payload.actionId]: {
          ...state.actions.byId[action.payload.actionId],
          status: ACTION_STATUS.UNKNOWN
        }
      }
    }
  }
}

function setSuccessAndUpdateActionState(state, action) {
  return {
    ...state,
    request: {
      ...state.request,
      loading: false,
      statusCode: (action.payload && action.payload.statusCode) || 200
    },
    actions: {
      allIds: state.actions.allIds,
      byId: {
        ...state.actions.byId,
        [action.payload.actionId]: {
          ...state.actions.byId[action.payload.actionId],
          status: ACTION_STATUS.SUCCESS
        }
      }
    }
  }
}

function setFailureState(state, action) {
  return {
    ...state,
    request: {
      ...state.request,
      message: action.payload.message,
      loading: false,
      statusCode: (action.payload && action.payload.statusCode) || 400
    },
    actions: {
      allIds: state.actions.allIds,
      byId: {
        ...state.actions.byId,
        [action.payload.actionId]: {
          ...state.actions.byId[action.payload.actionId],
          status: ACTION_STATUS.FAILURE
        }
      }
    }
  }
}
