import { connect } from 'react-redux'
import { morfixEncryptRequest } from 'store/actions/morfix'

import { selectPlainTextById, selectCipherTextById, selectMorfixEncryptor } from 'store/selectors/morfix'

import EncryptContainer from './EncryptContainer'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    cipherTexts: selectCipherTextById(state),
    isEncryptorReady: selectMorfixEncryptor(state)
  }
}

const mapDispatchToProps = {
  morfixEncryptRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(EncryptContainer)
