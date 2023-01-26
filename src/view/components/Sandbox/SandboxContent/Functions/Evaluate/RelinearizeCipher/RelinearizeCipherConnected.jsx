import { connect } from 'react-redux'
import { morfixEvaluateRelinearizeCipherRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import RelinearizeCipherContainer from './RelinearizeCipherContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateRelinearizeCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RelinearizeCipherContainer)
