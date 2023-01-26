import { connect } from 'react-redux'

import {
  morfixCreatePlainTextRequest,
  morfixDeletePlainTextRequest,
  morfixDownloadPlainTextRequest,
  morfixUploadPlainTextRequest,
  morfixCreateCipherTextRequest,
  morfixDeleteCipherTextRequest,
  morfixDownloadCipherTextRequest,
  morfixUploadCipherTextRequest
} from 'store/actions/morfix'

import { selectMorfixContext, selectPlainTextById, selectCipherTextById } from 'store/selectors/morfix'

import VariablesContainer from './VariablesContainer'

const mapStateToProps = state => {
  return {
    isContextCreated: selectMorfixContext(state),
    plainTexts: selectPlainTextById(state),
    cipherTexts: selectCipherTextById(state)
  }
}

const mapDispatchToProps = {
  morfixCreatePlainTextRequest,
  morfixDeletePlainTextRequest,
  morfixDownloadPlainTextRequest,
  morfixUploadPlainTextRequest,
  morfixCreateCipherTextRequest,
  morfixDeleteCipherTextRequest,
  morfixDownloadCipherTextRequest,
  morfixUploadCipherTextRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(VariablesContainer)
