import { connect } from 'react-redux'
import { morfixEvaluateDotProductRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import DotProductContainer from './DotProductContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateDotProductRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(DotProductContainer)
