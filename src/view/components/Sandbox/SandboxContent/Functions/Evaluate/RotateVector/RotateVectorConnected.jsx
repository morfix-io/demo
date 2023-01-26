import { connect } from 'react-redux'
import { morfixEvaluateRotateVectorRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import RotateVectorContainer from './RotateVectorContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateRotateVectorRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RotateVectorContainer)
