import { call, fork, take, race, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { engineUploadSecretKeyFailure, engineUploadSecretKeySuccess } from 'store/actions/engine'
import { MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST } from 'store/constants/morfix'
import shortid from 'shortid'
import {
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE
} from 'store/constants/morfix'

export default function* engineUploadSecretKeyWorker(action) {
  try {
    const workers = yield getContext('workers')
    const payload = yield call(utils.removeEmptyValues, action.payload)

    const {
      api,
      constants: { SCHEME_TYPES },
      morfixCreateEncParmsRequest,
      morfixCreateContextRequest,
      morfixCreateBatchEncoderRequest,
      morfixCreateCkksEncoderRequest,
      morfixCreateEvaluatorRequest,
      morfixUploadSecretKeyRequest,
      morfixCreateKeyGeneratorRequest,
      morfixGeneratePublicKeyRequest,
      morfixCreateEncryptorRequest,
      morfixCreateDecryptorRequest,
      secretKey
    } = payload

    const keyId = shortid()

    const uploadActions = [
      {
        actionId: shortid(),
        function: {
          action: morfixCreateEncParmsRequest,
          payload: {
            schemeType: api.schemeType,
            securityLevel: api.securityLevel + ' Bits',
            polyModulusDegree: api.polyModulusDegree + ' Bits',
            bitSizes: api.coeffModulusBitSizes.join(','),
            bitSize: api.plainModulusBitSize,
            expandModChain: api.expandModChain,
            notify: false,
            continue: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action: morfixCreateContextRequest,
          payload: {
            continue: false,
            notify: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action:
            api.schemeType === SCHEME_TYPES.bfv || api.schemeType === SCHEME_TYPES.bgv
              ? morfixCreateBatchEncoderRequest
              : morfixCreateCkksEncoderRequest,
          payload: {
            notify: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action: morfixCreateEvaluatorRequest,
          payload: {
            notify: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action: morfixUploadSecretKeyRequest,
          payload: {
            id: keyId,
            name: secretKey.name,
            version: secretKey.version,
            encoded: secretKey.data,
            continue: false,
            notify: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action: morfixCreateKeyGeneratorRequest,
          payload: {
            secret: {
              id: keyId
            },
            public: {},
            continue: false,
            notify: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action: morfixGeneratePublicKeyRequest,
          payload: {
            id: keyId,
            continue: false,
            notify: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action: morfixCreateDecryptorRequest,
          payload: {
            secretKeyId: keyId,
            notify: false
          }
        }
      },
      {
        actionId: shortid(),
        function: {
          action: morfixCreateEncryptorRequest,
          payload: {
            publicKeyId: keyId,
            notify: false
          }
        }
      }
    ]

    yield fork(workers.morfix.engineExecuteAllActionsWorker, {
      type: MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST,
      payload: [...uploadActions]
    })

    const { failure } = yield race({
      success: take(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS),
      failure: take(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE)
    })

    // If there was a failure in any of the actions, halt
    // The error message will have already displayed from
    // the failing action
    if (failure) {
      const failureMessage = {
        ...failure.payload,
        message: `Failed to upload SecretKey: ${failure.payload.payload.message}`
      }
      yield put(engineUploadSecretKeyFailure(failureMessage))
      return
    }

    // Conform to a standard like the others
    const { data, status } = {
      data: {
        message: 'SecretKey uploaded successfully!'
      },
      status: 200
    }
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(engineUploadSecretKeySuccess(result))
  } catch (error) {
    yield put(engineUploadSecretKeyFailure(error))
  }
}
