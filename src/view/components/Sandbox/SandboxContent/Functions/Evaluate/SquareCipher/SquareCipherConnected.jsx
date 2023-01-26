import { connect } from 'react-redux'
import { morfixEvaluateSquareCipherRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import SquareCipherContainer from './SquareCipherContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateSquareCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(SquareCipherContainer)
