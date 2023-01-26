import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    background: 'white'
  }
}))

const Card404 = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <main className={classes.main}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h1" align="center" gutterBottom>
              404
            </Typography>
            <Typography component="h2" variant="h5" align="center" gutterBottom>
              <FormattedMessage id={'page_404_error'} />
            </Typography>
            <Typography component="h3" variant="body1" align="center" gutterBottom>
              <FormattedMessage id={'page_404_description'} />
            </Typography>

            <Button disableRipple component={Link} to="/" variant="contained" color="primary" mt={2}>
              <FormattedMessage id={'return_to_website'} />
            </Button>
          </Paper>
        </Grid>
      </main>
    </Fragment>
  )
}

export default Card404
