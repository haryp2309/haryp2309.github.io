import { IconButton, Typography } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React, { Component } from "react";
class GitHubButton extends Component {
  state = {};
  render() {
    return (
      <IconButton
        variant="contained"
        onClick={() => {
          window.open(this.props.url);
        }}
      >
        <GitHub style={{ margin: "5px", color: "#fff" }}></GitHub>
        <Typography>Source Code</Typography>
      </IconButton>
    );
  }
}

export default GitHubButton;
