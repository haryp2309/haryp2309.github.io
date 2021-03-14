import React, { Component } from "react";
import { loadGitHubRepos } from "./githubConstants";
import RepoCard from "./repoCard";
class RepoCarcContainer extends Component {
  state = {
    repos: [],
  };

  constructor() {
    super();
    loadGitHubRepos(this.handleGitHubRepos);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {this.state.repos.map((repo) => {
          return <RepoCard repo={repo} key={repo.id} />;
        })}
      </div>
    );
  }

  handleGitHubRepos = (repos) => {
    this.setState({ repos });
  };
}

export default RepoCarcContainer;
