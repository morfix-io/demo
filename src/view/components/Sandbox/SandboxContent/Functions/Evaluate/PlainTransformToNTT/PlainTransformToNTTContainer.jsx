import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import { Button, withStyles } from '@material-ui/core'
import styles from './styles'
import { injectIntl } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class PlainTransformToNTTContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      plainTextIdA: 'select',
      plainTextIdDestination: 'select'
    }
  }

  onPlainTextChangeA = event => {
    const { value } = event.target
    this.setState({
      plainTextIdA: value
    })
  }

  onPlainTextChangeDestination = event => {
    const { value } = event.target
    this.setState({
      plainTextIdDestination: value
    })
  }

  _constructAction = () => {
    const { morfixEvaluatePlainTransformToNTTRequest } = this.props

    const { plainTextIdA, plainTextIdDestination } = this.state

    return {
      action: morfixEvaluatePlainTransformToNTTRequest,
      payload: {
        plainTextIdA,
        plainTextIdDestination
      }
    }
  }

  componentDidMount() {
    const { onUpdateAction, payload } = this.props
    this.setState(
      {
        ...(payload.plainTextIdA && { plainTextIdA: payload.plainTextIdA }),
        ...(payload.plainTextIdDestination && { plainTextIdDestination: payload.plainTextIdDestination })
      },
      () => {
        const action = this._constructAction()
        onUpdateAction(action)
      }
    )
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    const { onUpdateAction, payload } = this.props

    // If the state has changed, update the action
    if (prevState !== this.state) {
      const action = this._constructAction()
      onUpdateAction(action)
    }

    // If the payload contents changed, set the new state.
    if (
      prevProps.payload.plainTextIdA !== payload.plainTextIdA ||
      prevProps.payload.plainTextIdDestination !== payload.plainTextIdDestination
    ) {
      this.setState({
        ...this.state,
        ...(payload.plainTextIdA && { plainTextIdA: payload.plainTextIdA }),
        ...(payload.plainTextIdDestination && { plainTextIdDestination: payload.plainTextIdDestination })
      })
    }
  }

  onExec = event => {
    event.preventDefault()
    const { onExec } = this.props
    onExec()
  }

  render() {
    const { classes, intl, plainTexts, isEvaluatorReady } = this.props

    const { plainTextIdA, plainTextIdDestination } = this.state

    return (
      <Paper component="form" className={classes.root}>
        <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Grid
            item
            xs={12}
            sm={8}
            container
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <TextField
                select
                disabled={!isEvaluatorReady}
                label={intl.formatMessage({ id: 'plaintext_a' })}
                helperText={intl.formatMessage({ id: 'plaintext_a_description' })}
                className={classes.textField}
                value={plainTexts[plainTextIdA] ? plainTextIdA : 'select'}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                onChange={this.onPlainTextChangeA}
              >
                <MenuItem value={'select'} disabled>
                  {intl.formatMessage({ id: 'select_a_plaintext' })}
                </MenuItem>
                {Object.entries(plainTexts).map(([key, value], index) => (
                  <MenuItem key={index} value={key}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                select
                disabled={!isEvaluatorReady}
                label={intl.formatMessage({ id: 'plaintext_destination' })}
                helperText={intl.formatMessage({ id: 'plaintext_destination_description_plain_transform_to_ntt' })}
                className={classes.textField}
                value={plainTexts[plainTextIdDestination] ? plainTextIdDestination : 'select'}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                onChange={this.onPlainTextChangeDestination}
              >
                <MenuItem value={'select'} disabled>
                  {intl.formatMessage({ id: 'select_a_plaintext' })}
                </MenuItem>
                {Object.entries(plainTexts).map(([key, value], index) => (
                  <MenuItem key={index} value={key}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4} container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={this.onExec}
                disabled={
                  !plainTexts[plainTextIdA] ||
                  plainTextIdA === 'select' ||
                  !plainTexts[plainTextIdDestination] ||
                  plainTextIdDestination === 'select' ||
                  !isEvaluatorReady
                }
              >
                <Typography variant="button" display="block">
                  {intl.formatMessage({ id: 'plain_transform_to_ntt' })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

PlainTransformToNTTContainer.propTypes = {}

export default compose(withStyles(styles), withConstants, injectIntl)(PlainTransformToNTTContainer)
