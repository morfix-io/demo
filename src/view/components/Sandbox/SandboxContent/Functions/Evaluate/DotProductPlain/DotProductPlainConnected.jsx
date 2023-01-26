import { connect } from 'react-redux'
import { morfixEvaluateDotProductPlainRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectPlainTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import DotProductPlainContainer from './DotProductPlainContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    plainTexts: selectPlainTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateDotProductPlainRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(DotProductPlainContainer)
