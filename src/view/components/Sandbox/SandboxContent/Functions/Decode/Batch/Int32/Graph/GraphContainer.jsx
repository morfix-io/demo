import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core'
import styles from './styles'
import { injectIntl } from 'react-intl'
import Paper from '@material-ui/core/Paper'
import Dygraph from 'dygraphs'
import { SCHEME_TYPES } from 'shared/constants'

class GraphContainer extends PureComponent {
  formatBFVData = ({ rawData }) => {
    const numRows = rawData.length / 2 // Size of the data cut in half

    let data = []

    // Initialize all the arrays
    for (let j = 0; j < numRows; ++j) {
      data[j] = [j]
      data[j][1] = rawData[j]
      data[j][2] = rawData[j + numRows]
    }

    return data
  }

  formatCKKSData = ({ rawData }) => {
    const numRows = rawData.length // Size of the data
    let data = []

    // Initialize all the arrays
    for (let j = 0; j < numRows; ++j) {
      data[j] = [j]
      data[j][1] = rawData[j]
    }

    return data
  }

  makeGraph = ({ scheme, div, data, opts }) => {
    let formattedData = []
    if (scheme === SCHEME_TYPES.bfv || scheme === SCHEME_TYPES.bgv) {
      formattedData = this.formatBFVData({ rawData: data })
    }
    if (scheme === SCHEME_TYPES.ckks) {
      formattedData = this.formatCKKSData({ rawData: data })
    }
    const g = new Dygraph(div, formattedData, opts)
  }

  componentDidMount() {
    const { rawData } = this.props
    this.makeGraph({
      scheme: 'bfv',
      div: 'graph',
      data: rawData,
      opts: {
        xlabel: 'Index',
        ylabel: 'Value'
      }
    })
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    if (prevProps.rawData !== this.props.rawData) {
      const { rawData } = this.props
      this.makeGraph({
        scheme: 'bfv',
        div: 'graph',
        data: rawData,
        opts: {
          xlabel: 'Index',
          ylabel: 'Value'
        }
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <div id={'graph'} />
      </Paper>
    )
  }
}

GraphContainer.propTypes = {}

export default compose(withStyles(styles), injectIntl)(GraphContainer)
