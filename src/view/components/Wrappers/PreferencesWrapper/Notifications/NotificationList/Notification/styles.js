export default theme => ({
  root: {
    flexWrap: 'inherit'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  success: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  error: {
    backgroundColor: theme.palette.error.main,
    margin: theme.spacing(1)
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  }
})
