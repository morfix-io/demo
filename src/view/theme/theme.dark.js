import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'
import baseTheme from './theme.base'

export default responsiveFontSizes(
  createTheme({
    ...baseTheme,
    type: 'dark',
    palette: {
      primary: {
        main: '#2C2C36'
      },
      secondary: {
        main: '#22AAA1'
      },
      warn: {
        main: '#FFBA08'
      },
      error: {
        main: '#DB324D'
      },
      default: {
        main: '#2C2C36'
      },
      info: {
        main: '#FFFFFF'
      },
      plain: {
        main: '#22AAA1'
      },
      cipher: {
        main: '#577399'
      },
      public: {
        main: '#22AAA1'
      },
      relin: {
        main: '#577399'
      },
      galois: {
        main: '#54457F'
      },
      beta: {
        main: '#FFCA3A'
      },
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold: 3,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    }
  })
)
