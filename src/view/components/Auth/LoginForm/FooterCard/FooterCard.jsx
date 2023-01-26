import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, CardContent, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { path } from 'view/components/Auth/util'
import config from 'config'

const useStyles = makeStyles(theme => ({
  card: {
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`
  }
}))

const FooterCard = props => {
  const { redirect } = props
  const classes = useStyles()

  const query = path(redirect)
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          className={classes.submit}
          container
          item
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Grid item>
            <Typography className={classes.title}>
              <FormattedMessage id={'dont_have_an_account'} />
            </Typography>
          </Grid>
          <Grid item>
            <Button
              color="default"
              component={Link}
              to={`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.REGISTER}${query}`}
            >
              <FormattedMessage id={'sign_up'} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

FooterCard.propTypes = {
  redirect: PropTypes.any
}

export default FooterCard
