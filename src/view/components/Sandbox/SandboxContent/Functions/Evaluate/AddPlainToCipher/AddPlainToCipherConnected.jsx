import { connect } from 'react-redux'
import { morfixEvaluateAddPlainToCipherRequest } from 'store/actions/morfix'

import { selectPlainTextById, selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import AddPlainToCipherContainer from './AddPlainToCipherContainer'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateAddPlainToCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlainToCipherContainer)
