export default theme => ({
  root: {
    flexGrow: 1
  },
  dividerMiddle: {
    marginTop: 15,
    marginBottom: 15
  },
  paperRoot: {
    maxWidth: 450,
    // minHeight: 300,
    flexGrow: 1,
    padding: theme.spacing(6),
    margin: theme.spacing(3)
  },
  input: {
    flex: 1
  },
  gridRoot: {
    display: 'flex'
  },
  createButton: {
    marginTop: 24
  },
  deleteButton: {
    color: theme.palette.error.light,
    backgroundColor: theme.palette.getContrastText(theme.palette.error.light),
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.error.light),
      backgroundColor: theme.palette.error.light
    }
  }
})
