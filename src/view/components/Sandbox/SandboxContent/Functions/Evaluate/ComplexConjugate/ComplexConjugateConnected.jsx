import { connect } from 'react-redux'
import { morfixEvaluateComplexConjugateRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import ComplexConjugateContainer from './ComplexConjugateContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateComplexConjugateRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplexConjugateContainer)
