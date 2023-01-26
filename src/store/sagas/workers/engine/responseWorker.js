import { fork, race, put, getContext, take } from 'redux-saga/effects'
import { engineResponseFailure, engineResponseSuccess } from 'store/actions/engine'
import shortid from 'shortid'
import {
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE
} from 'store/constants/morfix'

export default function* engineResponseWorker(response) {
  try {
    const workers = yield getContext('workers')

    // Extract the result
    const { action, result } = response.payload

    // Extract the original variables (ciphers)
    const variables = action.payload.variables.reduce((acc, item) => {
      acc[item.uuid] = item
      return acc
    }, {})

    // Extract action creators from the payload
    const {
      constants: { SCHEME_TYPES },
      schemeType,
      morfixCreatePlainTextRequest,
      morfixCreateCipherTextRequest,
      morfixLoadCipherTextRequest,
      morfixDecryptRequest,
      morfixBatchDecodeInt32Request,
      morfixCkksDecodeFloat64Request
    } = action.payload

    // Determine new variables (if variable was marked as private, but was returned in the response)
    const newVariables = result.reduce((acc, item) => {
      // If we don't have the cipher add it to the list
      if (!variables[item.uuid]) {
        acc.push(item)
      }
      return acc
    }, [])

    const createPlainTextActions = newVariables.map(x => ({
      actionId: shortid(),
      function: {
        action: morfixCreatePlainTextRequest,
        payload: {
          id: x.uuid,
          name: x.name,
          notify: false
        }
      }
    }))
    const createCipherTextActions = newVariables.map(x => ({
      actionId: shortid(),
      function: {
        action: morfixCreateCipherTextRequest,
        payload: {
          id: x.uuid,
          name: x.name,
          notify: false
        }
      }
    }))

    const loadCipherTextActions = result.map(x => ({
      actionId: shortid(),
      function: {
        action: morfixLoadCipherTextRequest,
        payload: {
          id: x.uuid,
          encoded: x.encoded,
          notify: false
        }
      }
    }))

    const decryptCipherTextsActions = result.map(x => ({
      actionId: shortid(),
      function: {
        action: morfixDecryptRequest,
        payload: {
          cipherTextId: x.uuid,
          plainTextId: x.uuid,
          notify: false
        }
      }
    }))

    const decodePlainTextActions = result.map(x => ({
      actionId: shortid(),
      function: {
        action:
          schemeType === SCHEME_TYPES.bfv || schemeType === SCHEME_TYPES.bgv
            ? morfixBatchDecodeInt32Request
            : morfixCkksDecodeFloat64Request,
        payload: {
          id: x.uuid,
          notify: false
        }
      }
    }))

    yield fork(workers.morfix.engineExecuteAllActionsWorker, {
      type: MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST,
      payload: [
        ...createPlainTextActions,
        ...createCipherTextActions,
        ...loadCipherTextActions,
        ...decryptCipherTextsActions,
        ...decodePlainTextActions
      ]
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
        message: `Failed to process API response: ${failure.payload.payload.message}`
      }
      yield put(engineResponseFailure(failureMessage))
      return
    }

    // Conform to a standard like the others
    const { data, status } = {
      data: {
        message: 'Response successfully decrypted!'
      },
      status: 200
    }
    const conformedResult = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(engineResponseSuccess(conformedResult))
  } catch (error) {
    yield put(engineResponseFailure(error))
  }
}
