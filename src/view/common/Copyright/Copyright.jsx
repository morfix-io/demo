import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { Typography, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    background: 'transparent',
    boxShadow: 'none'
  },
  copyright: {
    textAlign: 'center'
  }
}))

const Copyright = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="regular">
          <Typography className={classes.copyright} variant="body1">
            <FormattedMessage
              id="copyright"
              values={{
                date: () => new Date().getFullYear()
              }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Copyright
