import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import styles from './styles'
import { FormattedMessage, injectIntl } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import shortid from 'shortid'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Upload from 'view/common/Upload'
import Paper from '@material-ui/core/Paper'

class VariablesContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      anchorCipherEl: null,
      anchorCipherDownloadEl: null,
      anchorPlainEl: null,
      anchorPlainDownloadEl: null,
      plainText: {
        name: 'Plain A'
      },
      cipherText: {
        name: 'Cipher A'
      }
    }
  }

  handleCipherClick = event => {
    this.setState({ anchorCipherEl: event.currentTarget })
  }
  handlePlainClick = event => {
    this.setState({ anchorPlainEl: event.currentTarget })
  }

  handleCipherDownloadClick = event => {
    this.setState({ anchorCipherDownloadEl: event.currentTarget })
  }
  handlePlainDownloadClick = event => {
    this.setState({ anchorPlainDownloadEl: event.currentTarget })
  }

  handleCipherClose = () => {
    this.setState({ anchorCipherEl: null })
  }
  handlePlainClose = () => {
    this.setState({ anchorPlainEl: null })
  }
  handleCipherDownloadClose = () => {
    this.setState({ anchorCipherDownloadEl: null })
  }
  handlePlainDownloadClose = () => {
    this.setState({ anchorPlainDownloadEl: null })
  }

  onPlainTextNameChange = event => {
    const { value } = event.target
    this.setState({
      plainText: {
        name: value
      }
    })
  }
  onCipherTextNameChange = event => {
    const { value } = event.target
    this.setState({
      cipherText: {
        name: value
      }
    })
  }

  onCreatePlainText = event => {
    event.preventDefault()

    const {
      plainText: { name }
    } = this.state

    const { morfixCreatePlainTextRequest } = this.props
    const id = shortid()
    morfixCreatePlainTextRequest({
      id,
      name: name
    })
    this.setState({
      ...this.state,
      plainText: {
        name: ''
      }
    })
  }

  onCreateCipherText = event => {
    event.preventDefault()

    const {
      cipherText: { name }
    } = this.state
    const { morfixCreateCipherTextRequest } = this.props
    const id = shortid()
    morfixCreateCipherTextRequest({
      id,
      name: name
    })
    this.setState({
      ...this.state,
      cipherText: {
        name: ''
      }
    })
  }

  onDeletePlainText = id => event => {
    event.preventDefault()

    const { morfixDeletePlainTextRequest } = this.props
    morfixDeletePlainTextRequest({
      id
    })
    this.setState({ anchorPlainEl: null })
  }

  onDeleteCipherText = id => event => {
    event.preventDefault()

    const { morfixDeleteCipherTextRequest } = this.props
    morfixDeleteCipherTextRequest({
      id
    })
    this.setState({ anchorCipherEl: null })
  }

  onDownloadPlainText = plain => event => {
    event.preventDefault()

    const { morfixDownloadPlainTextRequest } = this.props
    morfixDownloadPlainTextRequest({
      id: plain.id,
      name: `${plain.name}.txt`
    })
  }
  onDownloadCipherText = cipher => event => {
    event.preventDefault()

    const { morfixDownloadCipherTextRequest } = this.props
    morfixDownloadCipherTextRequest({
      id: cipher.id,
      name: `${cipher.name}.txt`
    })
  }

  onUploadPlainText = file => {
    const { morfixUploadPlainTextRequest } = this.props
    morfixUploadPlainTextRequest({
      id: shortid(),
      name: file.name,
      version: file.version,
      encoded: file.data
    })
  }

  onUploadCipherText = file => {
    const { morfixUploadCipherTextRequest } = this.props
    morfixUploadCipherTextRequest({
      id: shortid(),
      name: file.name,
      version: file.version,
      encoded: file.data
    })
  }

  render() {
    const { classes, intl, isContextCreated, plainTexts, cipherTexts } = this.props

    const { plainText, cipherText, anchorCipherEl, anchorCipherDownloadEl, anchorPlainEl, anchorPlainDownloadEl } =
      this.state

    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h2" gutterBottom>
          {intl.formatMessage({ id: 'variables' })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'variables_description' })}
        </Typography>

        <Grid
          className={classes.gridRoot}
          direction="row"
          spacing={3}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Paper className={classes.paperRoot} component="form" onSubmit={this.onCreatePlainText}>
            <Typography gutterBottom variant="h5" component="h3">
              <FormattedMessage id={'plaintext'} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <FormattedMessage id={'plaintext_description'} />
            </Typography>
            <Grid item direction="column" spacing={3} container justifyContent="space-between" alignItems="center">
              <Grid item container direction="row" spacing={1} justifyContent="space-evenly" alignItems="center">
                <Grid item>
                  <TextField
                    id={'INPUT-plaintext-name'}
                    fullWidth
                    label={intl.formatMessage({ id: 'plaintext_name' })}
                    type="text"
                    name="plainTextName"
                    margin="normal"
                    value={plainText.name}
                    onChange={this.onPlainTextNameChange}
                  />
                </Grid>
                <Grid item>
                  <Button
                    id={'BUTTON-create-plaintext'}
                    className={classes.createButton}
                    variant="contained"
                    color="primary"
                    type={'submit'}
                    onClick={this.onCreatePlainText}
                    disabled={!plainText.name}
                  >
                    <Typography id={'BUTTON-create-plaintext-text'} variant="button" display="block">
                      {intl.formatMessage({ id: 'create' })}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid item container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <Upload onUploaded={this.onUploadPlainText} disabled={!isContextCreated} label={'plaintext'} />
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Button
                    id={'BUTTON-delete-plaintext'}
                    className={classes.deleteButton}
                    disabled={Object.keys(plainTexts).length === 0}
                    onClick={this.handlePlainClick}
                  >
                    <Typography id={'BUTTON-delete-plaintext-text'} variant="button" display="block">
                      {intl.formatMessage({ id: 'delete' })}
                    </Typography>
                  </Button>
                  <Menu anchorEl={anchorPlainEl} open={Boolean(anchorPlainEl)} onClose={this.handlePlainClose}>
                    {Object.entries(plainTexts).map(([key, value], index) => (
                      <MenuItem key={index} value={key} onClick={this.onDeletePlainText(key)}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item>
                  <Button
                    id={'BUTTON-download-plaintext'}
                    variant="contained"
                    color="primary"
                    disabled={Object.keys(plainTexts).length === 0}
                    onClick={this.handlePlainDownloadClick}
                  >
                    <Typography id={'BUTTON-download-plaintext-text'} variant="button" display="block">
                      {intl.formatMessage({ id: 'download' })}
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorPlainDownloadEl}
                    open={Boolean(anchorPlainDownloadEl)}
                    onClose={this.handlePlainDownloadClose}
                  >
                    {Object.entries(plainTexts).map(([key, value], index) => (
                      <MenuItem key={index} value={key} onClick={this.onDownloadPlainText(value)}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paperRoot} component="form" onSubmit={this.onCreateCipherText}>
            <Typography gutterBottom variant="h5" component="h3">
              <FormattedMessage id={'ciphertext'} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <FormattedMessage id={'ciphertext_description'} />
            </Typography>
            <Grid item direction="column" spacing={3} container justifyContent="space-between" alignItems="center">
              <Grid item container direction="row" spacing={1} justifyContent="space-evenly" alignItems="center">
                <Grid item>
                  <TextField
                    id={'INPUT-ciphertext-name'}
                    fullWidth
                    label={intl.formatMessage({ id: 'ciphertext_name' })}
                    type="text"
                    name="cipherTextName"
                    margin="normal"
                    value={cipherText.name}
                    onChange={this.onCipherTextNameChange}
                  />
                </Grid>
                <Grid item>
                  <Button
                    id={'BUTTON-create-ciphertext'}
                    className={classes.createButton}
                    variant="contained"
                    color="primary"
                    type={'submit'}
                    onClick={this.onCreateCipherText}
                    disabled={!cipherText.name}
                  >
                    <Typography id={'BUTTON-create-ciphertext-text'} variant="button" display="block">
                      {intl.formatMessage({ id: 'create' })}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid item container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <Upload onUploaded={this.onUploadCipherText} disabled={!isContextCreated} label={'ciphertext'} />
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Button
                    id={'BUTTON-delete-ciphertext'}
                    className={classes.deleteButton}
                    disabled={Object.keys(cipherTexts).length === 0}
                    onClick={this.handleCipherClick}
                  >
                    <Typography id={'BUTTON-delete-ciphertext-text'} variant="button" display="block">
                      {intl.formatMessage({ id: 'delete' })}
                    </Typography>
                  </Button>
                  <Menu anchorEl={anchorCipherEl} open={Boolean(anchorCipherEl)} onClose={this.handleCipherClose}>
                    {Object.entries(cipherTexts).map(([key, value], index) => (
                      <MenuItem key={index} value={key} onClick={this.onDeleteCipherText(key)}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item>
                  <Button
                    id={'BUTTON-download-ciphertext'}
                    variant="contained"
                    color="primary"
                    disabled={Object.keys(cipherTexts).length === 0}
                    onClick={this.handleCipherDownloadClick}
                  >
                    <Typography id={'BUTTON-download-ciphertext-text'} variant="button" display="block">
                      {intl.formatMessage({ id: 'download' })}
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorCipherDownloadEl}
                    open={Boolean(anchorCipherDownloadEl)}
                    onClose={this.handleCipherDownloadClose}
                  >
                    {Object.entries(cipherTexts).map(([key, value], index) => (
                      <MenuItem key={index} value={key} onClick={this.onDownloadCipherText(value)}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Divider className={classes.dividerMiddle} />
      </div>
    )
  }
}

VariablesContainer.propTypes = {}

export default compose(withStyles(styles), withConstants, injectIntl)(VariablesContainer)
