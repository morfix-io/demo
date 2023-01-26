import { connect } from 'react-redux'
import { morfixDecryptRequest } from 'store/actions/morfix'

import { selectPlainTextById, selectCipherTextById, selectMorfixDecryptor } from 'store/selectors/morfix'

import DecryptContainer from './DecryptContainer'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    cipherTexts: selectCipherTextById(state),
    isDecryptorReady: selectMorfixDecryptor(state)
  }
}

const mapDispatchToProps = {
  morfixDecryptRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(DecryptContainer)
