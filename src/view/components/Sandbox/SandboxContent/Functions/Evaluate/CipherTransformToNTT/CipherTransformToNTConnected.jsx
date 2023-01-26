import { connect } from 'react-redux'
import { morfixEvaluateCipherTransformToNTTRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import CipherTransformToNTTContainer from './CipherTransformToNTTContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateCipherTransformToNTTRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(CipherTransformToNTTContainer)
