import { createMuiTheme } from "@material-ui/core/styles";

// from https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=00BCD4
export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#62efff",
      main: "#00bcd4",
      dark: "#008ba3",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff867c",
      main: "#ef5350",
      dark: "#b61827",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
  },
});
