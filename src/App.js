// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme } from "./components/colorPalette";
import { Container, CssBaseline } from "@material-ui/core";
import RepoCardContainer from "./components/repoCardContainer";
import React from "react";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <RepoCardContainer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
