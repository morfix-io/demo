import { connect } from 'react-redux'
import { morfixEvaluateMultiplyCipherByPlainRequest } from 'store/actions/morfix'

import { selectPlainTextById, selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import MultiplyCipherByPlainContainer from './MultiplyCipherByPlainContainer'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateMultiplyCipherByPlainRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiplyCipherByPlainContainer)
