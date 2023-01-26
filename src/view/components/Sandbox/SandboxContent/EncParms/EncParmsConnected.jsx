import { connect } from 'react-redux'

import EncParmsContainer from './EncParmsContainer'

import { morfixCreateEncParmsRequest, morfixCreateContextRequest } from 'store/actions/morfix'

import { selectMorfixEncParms } from 'store/selectors/morfix'

const mapStateToProps = state => {
  return {
    isEncParmsCreated: selectMorfixEncParms(state)
  }
}

const mapDispatchToProps = {
  morfixCreateEncParmsRequest,
  morfixCreateContextRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(EncParmsContainer)
