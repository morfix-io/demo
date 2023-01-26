import { connect } from 'react-redux'
import { morfixBatchEncodeInt32Request } from 'store/actions/morfix'

import { selectMorfixBatchEncoder, selectPlainTextById } from 'store/selectors/morfix'

import Int32Container from './Int32Container'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    isBatchEncoderReady: selectMorfixBatchEncoder(state)
  }
}

const mapDispatchToProps = {
  morfixBatchEncodeInt32Request
}

export default connect(mapStateToProps, mapDispatchToProps)(Int32Container)
