import { connect } from 'react-redux'
import { morfixEvaluateSumElementsRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import SumElementsContainer from './SumElementsContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateSumElementsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(SumElementsContainer)
