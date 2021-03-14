import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { Component } from "react";
import ProfilePicture from "./profilePicture";
import { loadGitHubProfilePicture } from "./githubConstants";

const titleStyle = {
  flexGrow: 1,
};

class Navbar extends Component {
  state = {
    pburl: undefined,
  };

  constructor() {
    super();
    loadGitHubProfilePicture(this.handleProfilePicture);
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton>
            <MenuIcon></MenuIcon>
          </IconButton> */}
          <Typography variant="h5" style={titleStyle}>
            Hary Pirajan's Projects
          </Typography>
          {this.state.pburl !== undefined ? (
            <ProfilePicture pburl={this.state.pburl} />
          ) : (
            console.log("Profile Picture not loaded yet")
          )}
        </Toolbar>
      </AppBar>
    );
  }

  handleProfilePicture = (pburl) => {
    this.setState({ pburl: pburl });
  };
}

export default Navbar;
