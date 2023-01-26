import { connect } from 'react-redux'
import { morfixEvaluateCipherModulusSwitchToNextRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import CipherModulusSwitchToNextContainer from './CipherModulusSwitchToNextContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateCipherModulusSwitchToNextRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(CipherModulusSwitchToNextContainer)
