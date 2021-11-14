// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme } from "./components/colorPalette";
import { Container, CssBaseline } from "@material-ui/core";
import RepoCardContainer from "./components/repoCardContainer";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/old">
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Navbar />
            <Container maxWidth="lg">
              <RepoCardContainer />
            </Container>
          </ThemeProvider>
        </Route>
        <Route
          path="/"
          component={() => {
            window.location.href = "https://haryp2309.vercel.app/";
            return null;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
