import { connect } from 'react-redux'

import {
  morfixEngineCreateActionRequest,
  morfixEngineUpdateActionRequest,
  morfixEngineDeleteActionRequest,
  morfixEngineExecuteAllActionsRequest
} from 'store/actions/morfix'

import { createApiObjectRequest } from 'store/actions/api'

import { selectSessionIsLoggedIn } from 'store/selectors/session'

import {
  selectMorfixPublicKeys,
  selectMorfixSecretKeys,
  selectMorfixRelinKeys,
  selectMorfixGaloisKeys,
  selectPlainTexts,
  selectCipherTexts,
  selectMorfixEngineActions,
  selectMorfixEngineActionsAllIds,
  selectMorfixEngineActionsById
} from 'store/selectors/morfix'

import FunctionsContainer from './FunctionsContainer'

const mapStateToProps = state => {
  return {
    publicKeys: selectMorfixPublicKeys(state),
    secretKeys: selectMorfixSecretKeys(state),
    relinKeys: selectMorfixRelinKeys(state),
    galoisKeys: selectMorfixGaloisKeys(state),
    plainTexts: selectPlainTexts(state),
    cipherTexts: selectCipherTexts(state),
    actions: selectMorfixEngineActions(state),
    actionsAllIds: selectMorfixEngineActionsAllIds(state),
    actionsById: selectMorfixEngineActionsById(state),
    isLoggedIn: selectSessionIsLoggedIn(state)
  }
}

const mapDispatchToProps = {
  morfixEngineCreateActionRequest,
  morfixEngineUpdateActionRequest,
  morfixEngineDeleteActionRequest,
  morfixEngineExecuteAllActionsRequest,
  createApiObjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionsContainer)
