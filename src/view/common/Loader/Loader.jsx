import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'progress-white': {
    color: theme.palette.common.white
  },
  'progress-primary': {
    color: theme.palette.primary.main
  }
}))

const Loader = ({ text, size, margin, color }) => {
  const classes = useStyles()

  return (
    <span className={classes.root}>
      <CircularProgress style={{ margin }} className={classes[`progress-${color}`]} size={size} />
      {text && <Typography>{text}</Typography>}
    </span>
  )
}

Loader.defaultProps = {
  color: 'white',
  text: '',
  size: 50,
  margin: 16
}

Loader.propTypes = {
  color: PropTypes.oneOf(['white', 'primary']),
  text: PropTypes.string,
  size: PropTypes.number,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Loader
