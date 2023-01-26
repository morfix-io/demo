import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { FormattedMessage } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import FooterCard from '../FooterCard'
import BasicForm from '../BasicForm/BasicForm'

const useStyles = makeStyles(theme => ({
  item: {
    width: '100%'
  },
  card: {
    maxWidth: 400,
    padding: `${theme.spacing(7)}px ${theme.spacing(5)}px`
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: 'center'
  }
}))

const RegistrationCard = props => {
  const {
    email,
    organizationName,
    password,
    onEmailChange,
    onOrganizationNameChange,
    onPasswordChange,
    onSubmit,
    loading,
    location
  } = props
  const classes = useStyles()
  return (
    <Grid
      direction="column"
      spacing={2}
      alignContent="space-around"
      justifyContent="space-around"
      alignItems="center"
      container
      item
    >
      <Grid className={classes.item} item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="h5">
              <FormattedMessage id={'account_registration'} />
            </Typography>

            <BasicForm
              email={email}
              organizationName={organizationName}
              password={password}
              onEmailChange={onEmailChange}
              onOrganizationNameChange={onOrganizationNameChange}
              onPasswordChange={onPasswordChange}
              onSubmit={onSubmit}
              loading={loading}
              location={location}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.item} item xs={12}>
        <FooterCard redirect={location.query.redirect} />
      </Grid>
    </Grid>
  )
}

RegistrationCard.propTypes = {
  location: PropTypes.any,
  email: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onOrganizationNameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default RegistrationCard
