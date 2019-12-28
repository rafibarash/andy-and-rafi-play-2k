import { blue, pink, red, yellow, green } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
let theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    error: red,
    warning: yellow,
    success: green,
    background: {
      default: '#e3f2fd',
      // default: '#fff',
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'Roboto', '"Helvetica Neue"', 'Arial'].join(
      ','
    ),
    fontSize: 10,
    htmlFontSize: 10,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
