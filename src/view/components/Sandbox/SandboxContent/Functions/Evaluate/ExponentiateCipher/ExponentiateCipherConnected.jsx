import { connect } from 'react-redux'
import { morfixEvaluateExponentiateCipherRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import ExponentiateCipherContainer from './ExponentiateCipherContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateExponentiateCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ExponentiateCipherContainer)
