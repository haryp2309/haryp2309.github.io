import React, { Component } from "react";
import { Card, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { darkTheme } from "./colorPalette";
import CardActionArea from "@material-ui/core/CardActionArea";
import { GitHub } from "@material-ui/icons";

const cardStyle = {
  minWidth: 345,
  maxWidth: 345,
  backgroundColor: darkTheme.palette.secondary.main,
  margin: "10px",
};

class RepoCard extends Component {
  state = {};

  render() {
    const { repo } = this.props;
    return (
      <Card color="secondary" style={cardStyle}>
        <CardActionArea onClick={() => window.open(repo.html_url)}>
          <CardContent>
            <Typography variant="h5">{repo.name}</Typography>
            <Typography>{repo.description}</Typography>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}></div>
              <GitHub style={{ margin: "5px", color: "#fff" }}></GitHub>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default RepoCard;
