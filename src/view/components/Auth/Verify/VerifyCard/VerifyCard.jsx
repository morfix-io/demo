import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'

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

const VerifyCard = props => {
  const { children, formName } = props
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom variant="h5">
          <FormattedMessage id={formName} />
        </Typography>
        {children}
      </CardContent>
    </Card>
  )
}

VerifyCard.propTypes = {
  children: PropTypes.any,
  formName: PropTypes.string.isRequired
}

export default VerifyCard
