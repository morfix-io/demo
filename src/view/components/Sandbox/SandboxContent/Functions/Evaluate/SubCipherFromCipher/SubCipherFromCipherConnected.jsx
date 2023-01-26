import { connect } from 'react-redux'
import { morfixEvaluateSubCipherFromCipherRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import SubCipherFromCipherContainer from './SubCipherFromCipherContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateSubCipherFromCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCipherFromCipherContainer)
