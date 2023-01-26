import { connect } from 'react-redux'
import { morfixEvaluateSubPlainFromCipherRequest } from 'store/actions/morfix'

import { selectPlainTextById, selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import SubPlainFromCipherContainer from './SubPlainFromCipherContainer'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateSubPlainFromCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(SubPlainFromCipherContainer)
