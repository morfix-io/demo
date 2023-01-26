import { connect } from 'react-redux'
import { morfixEvaluateNegateCipherRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import NegateCipherContainer from './NegateCipherContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateNegateCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(NegateCipherContainer)
