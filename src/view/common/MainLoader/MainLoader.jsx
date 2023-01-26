import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Loader from 'view/common/Loader'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    height: 'inherit'
  }
}))

const MainLoader = ({ text = '' }) => {
  const classes = useStyles()
  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.root}>
      <Loader text={text} />
    </Grid>
  )
}

MainLoader.propTypes = {
  text: PropTypes.string
}

export default MainLoader
