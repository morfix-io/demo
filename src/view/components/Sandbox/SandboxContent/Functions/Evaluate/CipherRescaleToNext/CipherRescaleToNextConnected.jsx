import { connect } from 'react-redux'
import { morfixEvaluateCipherRescaleToNextRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import CipherRescaleToNextContainer from './CipherRescaleToNextContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateCipherRescaleToNextRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(CipherRescaleToNextContainer)
