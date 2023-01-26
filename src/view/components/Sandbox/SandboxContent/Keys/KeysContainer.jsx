import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import { Button, withStyles } from '@material-ui/core'
import styles from './styles'
import { FormattedMessage, injectIntl } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import shortid from 'shortid'
import Upload from 'view/common/Upload'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'

class KeysContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      anchorPublicEl: null,
      anchorPublicDownloadEl: null,
      anchorSecretEl: null,
      anchorSecretDownloadEl: null,
      anchorRelinEl: null,
      anchorRelinDownloadEl: null,
      anchorGaloisEl: null,
      anchorGaloisDownloadEl: null,
      pair: {
        name: 'Keypair A'
      },
      keys: {
        public: {
          id: '',
          name: '',
          makeActive: false
        },
        secret: {
          id: '',
          name: '',
          makeActive: false
        },
        relin: {
          id: '',
          name: '',
          makeActive: false
        },
        galois: {
          id: '',
          name: '',
          makeActive: false
        }
      }
    }
  }

  handlePublicClick = event => {
    this.setState({ anchorPublicEl: event.currentTarget })
  }
  handleSecretClick = event => {
    this.setState({ anchorSecretEl: event.currentTarget })
  }
  handleRelinClick = event => {
    this.setState({ anchorRelinEl: event.currentTarget })
  }
  handleGaloisClick = event => {
    this.setState({ anchorGaloisEl: event.currentTarget })
  }

  handlePublicDownloadClick = event => {
    this.setState({ anchorPublicDownloadEl: event.currentTarget })
  }
  handleSecretDownloadClick = event => {
    this.setState({ anchorSecretDownloadEl: event.currentTarget })
  }
  handleRelinDownloadClick = event => {
    this.setState({ anchorRelinDownloadEl: event.currentTarget })
  }
  handleGaloisDownloadClick = event => {
    this.setState({ anchorGaloisDownloadEl: event.currentTarget })
  }

  handlePublicClose = () => {
    this.setState({ anchorPublicEl: null })
  }
  handleSecretClose = () => {
    this.setState({ anchorSecretEl: null })
  }
  handleRelinClose = () => {
    this.setState({ anchorRelinEl: null })
  }
  handleGaloisClose = () => {
    this.setState({ anchorGaloisEl: null })
  }

  handlePublicDownloadClose = () => {
    this.setState({ anchorPublicDownloadEl: null })
  }
  handleSecretDownloadClose = () => {
    this.setState({ anchorSecretDownloadEl: null })
  }
  handleRelinDownloadClose = () => {
    this.setState({ anchorRelinDownloadEl: null })
  }
  handleGaloisDownloadClose = () => {
    this.setState({ anchorGaloisDownloadEl: null })
  }

  onCreateKeyPair = e => {
    e.preventDefault()
    const { morfixCreateKeyGeneratorRequest } = this.props
    const { pair, keys } = this.state

    if (!pair.name) {
      return
    }

    const pkeyId = shortid()
    const skeyId = shortid()
    morfixCreateKeyGeneratorRequest({
      id: shortid(),
      public: {
        id: pkeyId,
        name: `Public key (${pair.name})`
      },
      secret: {
        id: skeyId,
        name: `Secret key (${pair.name})`
      }
    })
    this.setState({
      pair: {
        name: ''
      },
      keys: {
        secret: {
          ...keys.secret
        },
        public: {
          name: `Public key (${pair.name})`
        },
        relin: {
          name: `Relin key (${pair.name})`
        },
        galois: {
          name: `Galois key (${pair.name})`
        }
      }
    })
  }
  onCreateNewPublicKey = e => {
    e.preventDefault()
    const { morfixCreateKeyGeneratorRequest, secretKeys } = this.props
    const { keys } = this.state

    if (!keys.public.name) {
      return
    }

    const pkeyId = shortid()
    morfixCreateKeyGeneratorRequest({
      id: shortid(),
      public: {
        id: pkeyId,
        name: keys.public.name
      },
      ...(secretKeys.activeId && {
        secret: {
          ...secretKeys.byId[secretKeys.activeId]
        }
      })
    })
    this.setState({
      keys: {
        ...this.state.keys,
        public: {
          id: pkeyId,
          name: ''
        }
      }
    })
  }

  onCreateRelinKey = e => {
    e.preventDefault()
    const { morfixGenerateRelinKeyRequest } = this.props
    const { keys } = this.state

    if (!keys.relin.name) {
      return
    }

    const rkeyId = shortid()
    morfixGenerateRelinKeyRequest({
      id: rkeyId,
      name: keys.relin.name
    })
    this.setState({
      keys: {
        ...this.state.keys,
        relin: {
          id: rkeyId,
          name: ''
        }
      }
    })
  }
  onCreateGaloisKey = e => {
    e.preventDefault()
    const { morfixGenerateGaloisKeyRequest } = this.props
    const { keys } = this.state

    if (!keys.galois.name) {
      return
    }

    const gkeyId = shortid()
    morfixGenerateGaloisKeyRequest({
      id: gkeyId,
      name: keys.galois.name
    })
    this.setState({
      keys: {
        ...this.state.keys,
        galois: {
          id: gkeyId,
          name: ''
        }
      }
    })
  }

  onDownloadPublicKey = key => e => {
    e.preventDefault()
    const { morfixDownloadPublicKeyRequest } = this.props
    morfixDownloadPublicKeyRequest({
      ...key,
      name: `${key.name}.txt`
    })
  }
  onDownloadSecretKey = key => e => {
    e.preventDefault()
    const { morfixDownloadSecretKeyRequest } = this.props
    morfixDownloadSecretKeyRequest({
      ...key,
      name: `${key.name}.txt`
    })
  }
  onDownloadRelinKey = key => e => {
    e.preventDefault()
    const { morfixDownloadRelinKeyRequest } = this.props
    morfixDownloadRelinKeyRequest({
      ...key,
      name: `${key.name}.txt`
    })
  }
  onDownloadGaloisKey = key => e => {
    e.preventDefault()
    const { morfixDownloadGaloisKeyRequest } = this.props
    morfixDownloadGaloisKeyRequest({
      ...key,
      name: `${key.name}.txt`
    })
  }

  onUploadPublicKey = file => {
    const { morfixUploadPublicKeyRequest } = this.props
    morfixUploadPublicKeyRequest({
      id: shortid(),
      name: file.name,
      version: file.version,
      encoded: file.data
    })
  }

  onUploadSecretKey = file => {
    const { morfixUploadSecretKeyRequest } = this.props
    morfixUploadSecretKeyRequest({
      id: shortid(),
      name: file.name,
      version: file.version,
      encoded: file.data
    })
  }

  onUploadRelinKey = file => {
    const { morfixUploadRelinKeyRequest } = this.props
    morfixUploadRelinKeyRequest({
      id: shortid(),
      name: file.name,
      version: file.version,
      encoded: file.data
    })
  }

  onUploadGaloisKey = file => {
    const { morfixUploadGaloisKeyRequest } = this.props
    morfixUploadGaloisKeyRequest({
      id: shortid(),
      name: file.name,
      version: file.version,
      encoded: file.data
    })
  }

  onPublicKeyChange = e => {
    e.preventDefault()
    const { morfixSetActivePublicKeyRequest } = this.props
    morfixSetActivePublicKeyRequest({
      id: e.target.value
    })
  }

  onSecretKeyChange = e => {
    e.preventDefault()
    const { morfixSetActiveSecretKeyRequest } = this.props
    const { id, name } = e.target.value
    morfixSetActiveSecretKeyRequest({
      id
    })
    this.setState({
      keys: {
        public: {
          name: `Public key (${name})`
        },
        relin: {
          name: `Relin key (${name})`
        },
        galois: {
          name: `Galois key (${name})`
        }
      }
    })
  }
  onRelinKeyChange = e => {
    e.preventDefault()
    const { morfixSetActiveRelinKeyRequest } = this.props
    morfixSetActiveRelinKeyRequest({
      id: e.target.value
    })
  }
  onGaloisKeyChange = e => {
    e.preventDefault()
    const { morfixSetActiveGaloisKeyRequest } = this.props
    morfixSetActiveGaloisKeyRequest({
      id: e.target.value
    })
  }

  onKeyPairNameChange = event => {
    const { value } = event.target
    this.setState({
      pair: {
        name: value
      }
    })
  }
  onPublicKeyNameChange = event => {
    const { value } = event.target
    this.setState({
      keys: {
        ...this.state.keys,
        public: {
          ...this.state.keys.public,
          name: value
        }
      }
    })
  }
  onRelinKeyNameChange = event => {
    const { value } = event.target
    this.setState({
      keys: {
        ...this.state.keys,
        relin: {
          ...this.state.keys.relin,
          name: value
        }
      }
    })
  }
  onGaloisKeyNameChange = event => {
    const { value } = event.target
    this.setState({
      keys: {
        ...this.state.keys,
        galois: {
          ...this.state.keys.galois,
          name: value
        }
      }
    })
  }

  onDeletePublicKey = key => e => {
    e.preventDefault()
    const { morfixDeletePublicKeyRequest } = this.props
    morfixDeletePublicKeyRequest({
      ...key
    })
    this.setState({ anchorPublicEl: null })
  }
  onDeleteSecretKey = key => e => {
    e.preventDefault()
    const { morfixDeleteSecretKeyRequest } = this.props
    morfixDeleteSecretKeyRequest({
      ...key
    })
    this.setState({ anchorSecretEl: null })
  }
  onDeleteRelinKey = key => e => {
    e.preventDefault()
    const { morfixDeleteRelinKeyRequest } = this.props
    morfixDeleteRelinKeyRequest({
      ...key
    })
    this.setState({ anchorRelinEl: null })
  }
  onDeleteGaloisKey = key => e => {
    e.preventDefault()
    const { morfixDeleteGaloisKeyRequest } = this.props
    morfixDeleteGaloisKeyRequest({
      ...key
    })
    this.setState({ anchorGaloisEl: null })
  }

  render() {
    const { classes, intl, isContextCreated, publicKeys, secretKeys, relinKeys, galoisKeys } = this.props

    const {
      pair,
      keys,
      anchorPublicEl,
      anchorPublicDownloadEl,
      anchorSecretEl,
      anchorSecretDownloadEl,
      anchorRelinEl,
      anchorRelinDownloadEl,
      anchorGaloisEl,
      anchorGaloisDownloadEl
    } = this.state

    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h2" gutterBottom>
          {intl.formatMessage({ id: 'keys' })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'keys_description' })}
        </Typography>

        <Grid direction="row" spacing={3} container justifyContent="center" alignItems="center">
          <Grid item spacing={3} container justifyContent="center" alignItems="center">
            <Paper className={classes.paperRoot} component="form" onSubmit={this.onCreateKeyPair}>
              <Typography gutterBottom variant="h5" component="h3">
                <FormattedMessage id={'secret_key'} />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <FormattedMessage id={'secret_key_description'} />
              </Typography>
              <Grid item direction="column" spacing={3} container justifyContent="space-between" alignItems="center">
                <Grid item container direction="column" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      id={'INPUT-key-pair-name'}
                      fullWidth
                      disabled={!isContextCreated}
                      label={intl.formatMessage({ id: 'key_pair_name' })}
                      helperText={intl.formatMessage({ id: 'create_a_new_secret_and_public_key_pair' })}
                      type="text"
                      name="keyPairName"
                      margin="normal"
                      value={pair.name}
                      onChange={this.onKeyPairNameChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-create-key-pair'}
                      variant="contained"
                      color="primary"
                      disabled={!isContextCreated || !pair.name}
                      onClick={this.onCreateKeyPair}
                    >
                      <Typography id={'BUTTON-create-key-pair-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'create' })}
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      select
                      disabled={secretKeys.allIds.length === 0}
                      label={intl.formatMessage({ id: 'active_secret_key' })}
                      helperText={intl.formatMessage({ id: 'select_active_secret_key_description' })}
                      margin="normal"
                      value={secretKeys.byId[secretKeys.activeId] || ''}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      onChange={this.onSecretKeyChange}
                    >
                      {secretKeys.allIds
                        .map(x => secretKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                  <Grid item>
                    <Upload onUploaded={this.onUploadSecretKey} disabled={!isContextCreated} label={'secretkey'} />
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Button
                      id={'BUTTON-delete-secret-key'}
                      className={classes.deleteButton}
                      disabled={secretKeys.allIds.length === 0}
                      onClick={this.handleSecretClick}
                    >
                      <Typography id={'BUTTON-delete-secret-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'delete' })}
                      </Typography>
                    </Button>
                    <Menu anchorEl={anchorSecretEl} open={Boolean(anchorSecretEl)} onClose={this.handleSecretClose}>
                      {secretKeys.allIds
                        .map(x => secretKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDeleteSecretKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-download-secret-key'}
                      variant="contained"
                      color="primary"
                      disabled={secretKeys.allIds.length === 0}
                      onClick={this.handleSecretDownloadClick}
                    >
                      <Typography id={'BUTTON-download-secret-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'download' })}
                      </Typography>
                    </Button>
                    <Menu
                      anchorEl={anchorSecretDownloadEl}
                      open={Boolean(anchorSecretDownloadEl)}
                      onClose={this.handleSecretDownloadClose}
                    >
                      {secretKeys.allIds
                        .map(x => secretKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDownloadSecretKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paperRoot} component="form" onSubmit={this.onCreateNewPublicKey}>
              <Typography gutterBottom variant="h5" component="h3">
                <FormattedMessage id={'public_key'} />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <FormattedMessage id={'public_key_description'} />
              </Typography>
              <Grid item direction="column" spacing={3} container justifyContent="space-between" alignItems="center">
                <Grid item container direction="column" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      id={'INPUT-public-key-name'}
                      fullWidth
                      disabled={!isContextCreated || !secretKeys.activeId}
                      label={intl.formatMessage({ id: 'public_key_name' })}
                      helperText={intl.formatMessage({ id: 'create_a_public_key_from_active_secret_key' })}
                      type="text"
                      name="publicKeyName"
                      margin="normal"
                      value={keys.public.name}
                      onChange={this.onPublicKeyNameChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-create-public-key'}
                      variant="contained"
                      color="primary"
                      disabled={!isContextCreated || !keys.public.name || !secretKeys.activeId}
                      onClick={this.onCreateNewPublicKey}
                    >
                      <Typography id={'BUTTON-create-public-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'create' })}
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      select
                      disabled={publicKeys.allIds.length === 0}
                      label={intl.formatMessage({ id: 'active_public_key' })}
                      helperText={intl.formatMessage({ id: 'select_active_public_key_description' })}
                      margin="normal"
                      value={publicKeys.activeId || ''}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      onChange={this.onPublicKeyChange}
                    >
                      {publicKeys.allIds
                        .map(x => publicKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid item container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                  <Grid item>
                    <Upload onUploaded={this.onUploadPublicKey} disabled={!isContextCreated} label={'publickey'} />
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Button
                      id={'BUTTON-delete-public-key'}
                      className={classes.deleteButton}
                      disabled={publicKeys.allIds.length === 0}
                      onClick={this.handlePublicClick}
                    >
                      <Typography id={'BUTTON-delete-public-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'delete' })}
                      </Typography>
                    </Button>
                    <Menu anchorEl={anchorPublicEl} open={Boolean(anchorPublicEl)} onClose={this.handlePublicClose}>
                      {publicKeys.allIds
                        .map(x => publicKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDeletePublicKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-download-public-key'}
                      variant="contained"
                      color="primary"
                      disabled={publicKeys.allIds.length === 0}
                      onClick={this.handlePublicDownloadClick}
                    >
                      <Typography id={'BUTTON-download-public-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'download' })}
                      </Typography>
                    </Button>
                    <Menu
                      anchorEl={anchorPublicDownloadEl}
                      open={Boolean(anchorPublicDownloadEl)}
                      onClose={this.handlePublicDownloadClose}
                    >
                      {publicKeys.allIds
                        .map(x => publicKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDownloadPublicKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item spacing={3} container justifyContent="center" alignItems="center">
            <Paper className={classes.paperRoot} component="form" onSubmit={this.onCreateRelinKey}>
              <Typography gutterBottom variant="h5" component="h3">
                <FormattedMessage id={'relin_key'} />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <FormattedMessage id={'relin_key_description'} />
              </Typography>
              <Grid item direction="column" spacing={3} container justifyContent="space-between" alignItems="center">
                <Grid item container direction="column" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      id={'INPUT-relin-key-name'}
                      fullWidth
                      disabled={!isContextCreated || !secretKeys.activeId}
                      label={intl.formatMessage({ id: 'relin_key_name' })}
                      helperText={intl.formatMessage({ id: 'create_a_relin_key_from_active_secret_key' })}
                      type="text"
                      name="relinKeyName"
                      margin="normal"
                      value={keys.relin.name}
                      onChange={this.onRelinKeyNameChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-create-relin-key'}
                      variant="contained"
                      color="primary"
                      disabled={!isContextCreated || !keys.relin.name || !secretKeys.activeId}
                      onClick={this.onCreateRelinKey}
                    >
                      <Typography id={'BUTTON-create-relin-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'create' })}
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>

                <Grid item container direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      select
                      disabled={relinKeys.allIds.length === 0}
                      label={intl.formatMessage({ id: 'active_relin_key' })}
                      helperText={intl.formatMessage({ id: 'select_active_relin_key_description' })}
                      margin="normal"
                      value={relinKeys.activeId || ''}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      onChange={this.onRelinKeyChange}
                    >
                      {relinKeys.allIds
                        .map(x => relinKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid item container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                  <Grid item>
                    <Upload onUploaded={this.onUploadRelinKey} disabled={!isContextCreated} label={'relinkey'} />
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Button
                      id={'BUTTON-delete-relin-key'}
                      className={classes.deleteButton}
                      disabled={relinKeys.allIds.length === 0}
                      onClick={this.handleRelinClick}
                    >
                      <Typography id={'BUTTON-delete-relin-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'delete' })}
                      </Typography>
                    </Button>
                    <Menu anchorEl={anchorRelinEl} open={Boolean(anchorRelinEl)} onClose={this.handleRelinClose}>
                      {relinKeys.allIds
                        .map(x => relinKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDeleteRelinKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-download-relin-key'}
                      variant="contained"
                      color="primary"
                      disabled={relinKeys.allIds.length === 0}
                      onClick={this.handleRelinDownloadClick}
                    >
                      <Typography id={'BUTTON-download-relin-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'download' })}
                      </Typography>
                    </Button>
                    <Menu
                      anchorEl={anchorRelinDownloadEl}
                      open={Boolean(anchorRelinDownloadEl)}
                      onClose={this.handleRelinDownloadClose}
                    >
                      {relinKeys.allIds
                        .map(x => relinKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDownloadRelinKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paperRoot} component="form" onSubmit={this.onCreateGaloisKey}>
              <Typography gutterBottom variant="h5" component="h3">
                <FormattedMessage id={'galois_key'} />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <FormattedMessage id={'galois_key_description'} />
              </Typography>
              <Grid item direction="column" spacing={3} container justifyContent="space-between" alignItems="center">
                <Grid item container direction="column" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      id={'INPUT-galois-key-name'}
                      fullWidth
                      disabled={!isContextCreated || !secretKeys.activeId}
                      label={intl.formatMessage({ id: 'galois_key_name' })}
                      helperText={intl.formatMessage({ id: 'create_a_galois_key_from_active_secret_key' })}
                      type="text"
                      name="galoisKeyName"
                      margin="normal"
                      value={keys.galois.name}
                      onChange={this.onGaloisKeyNameChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-create-galois-key'}
                      variant="contained"
                      color="primary"
                      disabled={!isContextCreated || !keys.galois.name || !secretKeys.activeId}
                      onClick={this.onCreateGaloisKey}
                    >
                      <Typography id={'BUTTON-create-galois-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'create' })}
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>

                <Grid item container direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <Grid item>
                    <TextField
                      select
                      disabled={galoisKeys.allIds.length === 0}
                      label={intl.formatMessage({ id: 'active_galois_key' })}
                      helperText={intl.formatMessage({ id: 'select_active_galois_key_description' })}
                      margin="normal"
                      value={galoisKeys.activeId || ''}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      onChange={this.onGaloisKeyChange}
                    >
                      {galoisKeys.allIds
                        .map(x => galoisKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid item container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                  <Grid item>
                    <Upload onUploaded={this.onUploadGaloisKey} disabled={!isContextCreated} label={'galoiskey'} />
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Button
                      id={'BUTTON-delete-galois-key'}
                      className={classes.deleteButton}
                      disabled={galoisKeys.allIds.length === 0}
                      onClick={this.handleGaloisClick}
                    >
                      <Typography id={'BUTTON-delete-galois-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'delete' })}
                      </Typography>
                    </Button>
                    <Menu anchorEl={anchorGaloisEl} open={Boolean(anchorGaloisEl)} onClose={this.handleGaloisClose}>
                      {galoisKeys.allIds
                        .map(x => galoisKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDeleteGaloisKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                  <Grid item>
                    <Button
                      id={'BUTTON-download-galois-key'}
                      variant="contained"
                      color="primary"
                      disabled={galoisKeys.allIds.length === 0}
                      onClick={this.handleGaloisDownloadClick}
                    >
                      <Typography id={'BUTTON-download-galois-key-text'} variant="button" display="block">
                        {intl.formatMessage({ id: 'download' })}
                      </Typography>
                    </Button>
                    <Menu
                      anchorEl={anchorGaloisDownloadEl}
                      open={Boolean(anchorGaloisDownloadEl)}
                      onClose={this.handleGaloisDownloadClose}
                    >
                      {galoisKeys.allIds
                        .map(x => galoisKeys.byId[x])
                        .map((item, index) => (
                          <MenuItem key={index} value={item.id} onClick={this.onDownloadGaloisKey(item)}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Divider className={classes.dividerMiddle} />
      </div>
    )
  }
}

KeysContainer.propTypes = {
  encParm: PropTypes.shape({
    schemeType: PropTypes.string.isRequired,
    securityLevel: PropTypes.string.isRequired,
    polyModulusDegree: PropTypes.string.isRequired,
    bitSize: PropTypes.number.isRequired,
    bitSizes: PropTypes.string.isRequired,
    expandModChain: PropTypes.bool.isRequired
  }),
  morfixCreateEncParmsRequest: PropTypes.func.isRequired,
  morfixCreateContextRequest: PropTypes.func.isRequired,
  morfixCreateKeyGeneratorRequest: PropTypes.func.isRequired,
  morfixGeneratePublicKeyRequest: PropTypes.func.isRequired,
  morfixGenerateSecretKeyRequest: PropTypes.func.isRequired,
  morfixGenerateRelinKeyRequest: PropTypes.func.isRequired,
  morfixGenerateGaloisKeyRequest: PropTypes.func.isRequired
}

export default compose(withStyles(styles), withConstants, injectIntl)(KeysContainer)
