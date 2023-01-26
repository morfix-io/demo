import { call, fork, take, race, put, getContext } from 'redux-saga/effects'
import utils from 'shared/utils'
import { enginePrepareFailure, enginePrepareSuccess } from 'store/actions/engine'
import { MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST } from 'store/constants/morfix'
import shortid from 'shortid'
import {
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE
} from 'store/constants/morfix'

export default function* enginePrepareWorker(action) {
  try {
    const workers = yield getContext('workers')
    const payload = yield call(utils.removeEmptyValues, action.payload)

    const {
      variables,
      morfixCreatePlainTextRequest,
      morfixCreateCipherTextRequest,
      morfixBatchEncodeInt32Request,
      morfixCkksEncodeFloat64Request,
      morfixEncryptRequest,
      morfixReadCipherTextRequest,
      api,
      constants: { ARG_TYPES, SCHEME_TYPES }
    } = payload

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

    const createPlainTextActions = plainInOrder.map(x => ({
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
    const createCipherTextActions = cipherInOrder.map(x => ({
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

    const encodePlainTextActions = plainInOrder.map(x => ({
      actionId: shortid(),
      function: {
        action:
          api.schemeType === SCHEME_TYPES.bfv || api.schemeType === SCHEME_TYPES.bgv
            ? morfixBatchEncodeInt32Request
            : morfixCkksEncodeFloat64Request,
        payload: {
          id: x.uuid,
          array: x.data,
          ...(api.schemeType === SCHEME_TYPES.ckks && {
            scale: x.scale
          }),
          notify: false
        }
      }
    }))

    const encryptActions = plainInOrder.map(x => ({
      actionId: shortid(),
      function: {
        action: morfixEncryptRequest,
        payload: {
          plainTextId: x.uuid,
          cipherTextId: x.uuid,
          notify: false
        }
      }
    }))

    const readCipherTextActions = cipherInOrder.map(x => ({
      actionId: shortid(),
      function: {
        action: morfixReadCipherTextRequest,
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
        ...encodePlainTextActions,
        ...encryptActions,
        ...readCipherTextActions
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
        message: `Failed to Encrypt data for API request: ${failure.payload.payload.message}`
      }
      yield put(enginePrepareFailure(failureMessage))
      return
    }

    // Conform to a standard like the others
    const { data, status } = {
      data: {
        message: 'Data encrypted and ready to send!'
      },
      status: 200
    }
    const result = {
      ...data,
      statusCode: status
    }
    data.statusCode = status
    yield put(enginePrepareSuccess(result))
  } catch (error) {
    yield put(enginePrepareFailure(error))
  }
}
