// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme } from "./components/colorPalette";
import { CssBaseline } from "@material-ui/core";
import RepoCardContainer from "./components/repoCardContainer";

const mainContainerStyle = {
  margin: "10px",
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <div style={mainContainerStyle}>
        <RepoCardContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
