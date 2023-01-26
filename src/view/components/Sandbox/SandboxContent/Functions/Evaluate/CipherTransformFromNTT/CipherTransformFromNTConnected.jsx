import { connect } from 'react-redux'
import { morfixEvaluateCipherTransformFromNTTRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import CipherTransformFromNTTContainer from './CipherTransformFromNTTContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateCipherTransformFromNTTRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(CipherTransformFromNTTContainer)
