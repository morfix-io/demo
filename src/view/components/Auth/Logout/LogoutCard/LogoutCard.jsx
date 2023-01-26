import React from 'react'
import { Card, Grid } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { FormattedMessage } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'

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

const LogoutCard = () => {
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
              <FormattedMessage id={'logout_successful'} />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

LogoutCard.propTypes = {}

export default LogoutCard
