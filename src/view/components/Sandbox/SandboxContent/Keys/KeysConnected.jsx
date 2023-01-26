import { connect } from 'react-redux'

import {
  morfixCreateEncParmsRequest,
  morfixCreateContextRequest,
  morfixCreateKeyGeneratorRequest,
  morfixDeletePublicKeyRequest,
  morfixDeleteSecretKeyRequest,
  morfixDeleteRelinKeyRequest,
  morfixDeleteGaloisKeyRequest,
  morfixGeneratePublicKeyRequest,
  morfixGenerateSecretKeyRequest,
  morfixGenerateRelinKeyRequest,
  morfixGenerateGaloisKeyRequest,
  morfixDownloadPublicKeyRequest,
  morfixDownloadSecretKeyRequest,
  morfixDownloadRelinKeyRequest,
  morfixDownloadGaloisKeyRequest,
  morfixUploadPublicKeyRequest,
  morfixUploadSecretKeyRequest,
  morfixUploadRelinKeyRequest,
  morfixUploadGaloisKeyRequest,
  morfixSetActivePublicKeyRequest,
  morfixSetActiveSecretKeyRequest,
  morfixSetActiveRelinKeyRequest,
  morfixSetActiveGaloisKeyRequest
} from 'store/actions/morfix'

import {
  selectMorfixEncParms,
  selectMorfixContext,
  selectMorfixPublicKeys,
  selectMorfixSecretKeys,
  selectMorfixRelinKeys,
  selectMorfixGaloisKeys
} from 'store/selectors/morfix'

import KeysContainer from './KeysContainer'

const mapStateToProps = state => {
  return {
    isEncParmsCreated: selectMorfixEncParms(state),
    isContextCreated: selectMorfixContext(state),
    publicKeys: selectMorfixPublicKeys(state),
    secretKeys: selectMorfixSecretKeys(state),
    relinKeys: selectMorfixRelinKeys(state),
    galoisKeys: selectMorfixGaloisKeys(state)
  }
}

const mapDispatchToProps = {
  morfixCreateEncParmsRequest,
  morfixCreateContextRequest,
  morfixCreateKeyGeneratorRequest,
  morfixDeletePublicKeyRequest,
  morfixDeleteSecretKeyRequest,
  morfixDeleteRelinKeyRequest,
  morfixDeleteGaloisKeyRequest,
  morfixSetActivePublicKeyRequest,
  morfixSetActiveSecretKeyRequest,
  morfixSetActiveRelinKeyRequest,
  morfixSetActiveGaloisKeyRequest,
  morfixGeneratePublicKeyRequest,
  morfixGenerateSecretKeyRequest,
  morfixGenerateRelinKeyRequest,
  morfixGenerateGaloisKeyRequest,
  morfixDownloadPublicKeyRequest,
  morfixDownloadSecretKeyRequest,
  morfixDownloadRelinKeyRequest,
  morfixDownloadGaloisKeyRequest,
  morfixUploadPublicKeyRequest,
  morfixUploadSecretKeyRequest,
  morfixUploadRelinKeyRequest,
  morfixUploadGaloisKeyRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(KeysContainer)
