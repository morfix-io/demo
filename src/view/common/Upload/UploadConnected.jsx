import { connect } from 'react-redux'

import {
  morfixCreateEncParmsRequest,
  morfixCreateContextRequest,
  morfixCreateKeyGeneratorRequest,
  morfixGeneratePublicKeyRequest,
  morfixGenerateSecretKeyRequest,
  morfixGenerateRelinKeyRequest,
  morfixGenerateGaloisKeyRequest,
  morfixDownloadPublicKeyRequest,
  morfixDownloadSecretKeyRequest,
  morfixDownloadRelinKeyRequest,
  morfixDownloadGaloisKeyRequest
} from 'store/actions/morfix'

import {
  selectMorfixEncParms,
  selectMorfixContext,
  selectMorfixKeyGenerator,
  selectMorfixPublicKeys,
  selectMorfixSecretKeys,
  selectMorfixRelinKeys,
  selectMorfixGaloisKeys
} from 'store/selectors/morfix'

import UploadContainer from './UploadContainer'

const mapStateToProps = state => {
  return {
    isEncParmsCreated: selectMorfixEncParms(state),
    isContextCreated: selectMorfixContext(state),
    isKeyGeneratorCreated: selectMorfixKeyGenerator(state),
    publicKey: selectMorfixPublicKeys(state),
    secretKey: selectMorfixSecretKeys(state),
    relinKey: selectMorfixRelinKeys(state),
    galoisKey: selectMorfixGaloisKeys(state)
  }
}

const mapDispatchToProps = {
  morfixCreateEncParmsRequest,
  morfixCreateContextRequest,
  morfixCreateKeyGeneratorRequest,
  morfixGeneratePublicKeyRequest,
  morfixGenerateSecretKeyRequest,
  morfixGenerateRelinKeyRequest,
  morfixGenerateGaloisKeyRequest,
  morfixDownloadPublicKeyRequest,
  morfixDownloadSecretKeyRequest,
  morfixDownloadRelinKeyRequest,
  morfixDownloadGaloisKeyRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer)
