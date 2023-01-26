import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { compose } from 'redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import withConstants from 'view/hocs/withConstants'
import EncParms from './EncParms'
import Keys from './Keys'
import Variables from './Variables'
import Functions from './Functions'

class SandboxContent extends PureComponent {
  constructor(props) {
    super(props)

    const {
      constants: { SCHEME_TYPES, SECURITY_LEVELS, POLYMODULUS_DEGREES }
    } = props

    this.initialState = {
      encParm: {
        schemeType: SCHEME_TYPES.bfv,
        securityLevel: SECURITY_LEVELS.BITS_128,
        polyModulusDegree: POLYMODULUS_DEGREES.BITS_4096,
        bitSizes: '36,36,37',
        bitSize: 20,
        expandModChain: true
      }
    }
    this.state = {
      ...this.initialState
    }
  }

  componentWillUnmount() {
    this.setState({
      ...this.initialState
    })
  }

  onSchemeTypeChange = event => {
    const { value } = event.target
    const { encParm } = this.state
    this.setState(
      {
        encParm: {
          ...encParm,
          schemeType: value
        }
      },
      () => {
        this.onCreateBitSizes()
      }
    )
  }

  onSecurityLevelChange = event => {
    const { value } = event.target
    const { encParm } = this.state
    this.setState(
      {
        encParm: {
          ...encParm,
          securityLevel: value
        }
      },
      () => {
        this.onCreateBitSizes()
      }
    )
  }

  onPolymodulusDegreeChange = event => {
    const { value } = event.target
    const { encParm } = this.state
    this.setState(
      {
        encParm: {
          ...encParm,
          polyModulusDegree: value
        }
      },
      () => {
        this.onCreateBitSizes()
      }
    )
  }

  onCreateBitSizes = () => {
    const { encParm } = this.state

    const bitSizes = this.calculateCoeffModulus()

    if (!bitSizes) {
      return
    }

    this.setState({
      encParm: {
        ...encParm,
        bitSizes
      }
    })
  }

  calculateCoeffModulus = () => {
    const { encParm } = this.state
    const {
      constants: { SCHEME_TYPES, BFV_COEFF_MOD_BIT_SIZES, CKKS_COEFF_MOD_BIT_SIZES }
    } = this.props

    if (encParm.schemeType === SCHEME_TYPES.none) {
      return
    }
    //-----
    if (!encParm.securityLevel || !BFV_COEFF_MOD_BIT_SIZES[encParm.securityLevel]) {
      return
    }
    if (!BFV_COEFF_MOD_BIT_SIZES[encParm.securityLevel][encParm.polyModulusDegree]) {
      return
    }
    if (encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv) {
      return BFV_COEFF_MOD_BIT_SIZES[encParm.securityLevel][encParm.polyModulusDegree].join(',')
    }
    //-----
    if (!encParm.securityLevel || !CKKS_COEFF_MOD_BIT_SIZES[encParm.securityLevel]) {
      return
    }
    if (!CKKS_COEFF_MOD_BIT_SIZES[encParm.securityLevel][encParm.polyModulusDegree]) {
      return
    }
    if (encParm.schemeType === SCHEME_TYPES.ckks) {
      return CKKS_COEFF_MOD_BIT_SIZES[encParm.securityLevel][encParm.polyModulusDegree].join(',')
    }
  }

  onBitSizeChange = event => {
    const { value } = event.target
    const { encParm } = this.state
    const bitSize = parseInt(value, 10) || 0
    this.setState({
      encParm: {
        ...encParm,
        bitSize
      }
    })
  }

  onBitSizesBlur = event => {
    const value = event.target.value.replace(/,+/g, ',').replace(/,$/, '').replace(/^,*/, '')
    const { encParm } = this.state

    // if (!/^[0-9]+(,[0-9]+)*$/.test(value)) {
    //   console.log('incorrect format')
    // }

    this.setState({
      encParm: {
        ...encParm,
        bitSizes: value || ''
      }
    })
  }
  onBitSizesChange = event => {
    const { value } = event.target
    const { encParm } = this.state

    if (!/^[0-9,]*$/.test(value)) {
      return
    }

    this.setState({
      encParm: {
        ...encParm,
        bitSizes: value
      }
    })
  }

  onExpandModChainChange = event => {
    const { checked } = event.target
    const { encParm } = this.state
    this.setState({
      encParm: {
        ...encParm,
        expandModChain: checked
      }
    })
  }

  render() {
    const { classes } = this.props
    const { encParm } = this.state

    return (
      <Fragment>
        <Typography variant="h4" component="h2" gutterBottom>
          <FormattedMessage id={'sandbox'} />
        </Typography>
        <Typography variant="body1" gutterBottom>
          <FormattedMessage
            id="sandbox_description"
            values={{
              // eslint-disable-next-line react/display-name
              a: msg => (
                /* eslint-disable-next-line react/jsx-no-target-blank */
                <a target="_blank" rel="noopener" href="https://github.com/microsoft/SEAL">
                  {msg}
                </a>
              ),
              // eslint-disable-next-line react/display-name
              b: msg => (
                /* eslint-disable-next-line react/jsx-no-target-blank */
                <a target="_blank" rel="noopener" href="https://github.com/morfix-io/node-seal">
                  {msg}
                </a>
              )
            }}
          />
        </Typography>
        <Divider className={classes.dividerMiddle} />
        <EncParms
          encParm={encParm}
          onSchemeTypeChange={this.onSchemeTypeChange}
          onSecurityLevelChange={this.onSecurityLevelChange}
          onPolymodulusDegreeChange={this.onPolymodulusDegreeChange}
          onBitSizeChange={this.onBitSizeChange}
          onBitSizesBlur={this.onBitSizesBlur}
          onBitSizesChange={this.onBitSizesChange}
          onExpandModChainChange={this.onExpandModChainChange}
        />
        <Keys encParm={encParm} />
        <Variables />
        <Functions encParm={encParm} />
      </Fragment>
    )
  }
}

SandboxContent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(withStyles(styles), withConstants, injectIntl)(SandboxContent)
