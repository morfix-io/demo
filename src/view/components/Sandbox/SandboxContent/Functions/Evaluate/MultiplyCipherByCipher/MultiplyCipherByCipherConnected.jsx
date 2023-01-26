import { connect } from 'react-redux'
import { morfixEvaluateMultiplyCipherByCipherRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import MultiplyCipherByCipherContainer from './MultiplyCipherByCipherContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateMultiplyCipherByCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiplyCipherByCipherContainer)
