import { connect } from 'react-redux'
import { morfixCkksEncodeFloat64Request } from 'store/actions/morfix'

import { selectMorfixCkksEncoder, selectPlainTextById } from 'store/selectors/morfix'

import Float64Container from './Float64Container'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    isCkksEncoderReady: selectMorfixCkksEncoder(state)
  }
}

const mapDispatchToProps = {
  morfixCkksEncodeFloat64Request
}

export default connect(mapStateToProps, mapDispatchToProps)(Float64Container)
