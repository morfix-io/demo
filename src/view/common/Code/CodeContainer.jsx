import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import { Button, withStyles } from '@material-ui/core'
import styles from './styles'
import { FormattedMessage, injectIntl } from 'react-intl'
import Typography from '@material-ui/core/Typography'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CopyToClipboard from 'view/common/Copy'

SyntaxHighlighter.registerLanguage('javascript', js)

class CodeContainer extends PureComponent {
  render() {
    const { classes, code, open, onClose } = this.props

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>
            <FormattedMessage id={'javascript'} />
          </DialogTitle>
          <DialogContent>
            <SyntaxHighlighter className={classes.code} language="javascript">
              {code && code.join('')}
            </SyntaxHighlighter>
          </DialogContent>
          <DialogActions>
            <Button id={'BUTTON-close-code'} onClick={onClose} color="primary">
              <Typography id={'BUTTON-close-code-text'} variant="button" display="block">
                <FormattedMessage id={'close'} />
              </Typography>
            </Button>
            <CopyToClipboard>
              {({ copy }) => (
                <Button id={'BUTTON-copy-code'} onClick={() => copy(code.join(''))} color="primary">
                  <Typography id={'BUTTON-copy-code-text'} variant="button" display="block">
                    <FormattedMessage id={'copy'} />
                  </Typography>
                </Button>
              )}
            </CopyToClipboard>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

CodeContainer.propTypes = {}

export default compose(withStyles(styles), withConstants, injectIntl)(CodeContainer)
