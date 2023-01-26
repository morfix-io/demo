import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SandboxContent from './SandboxContent'
import Copyright from 'view/common/Copyright'
import { Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  main: {
    // flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Sandbox = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <main className={classes.main}>
        <SandboxContent />
      </main>
      <Copyright />
    </Container>
  )
}

export default Sandbox
