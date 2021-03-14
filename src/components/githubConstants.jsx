const baseUrl = "https://api.github.com/users/haryp2309";

export const loadGitHubProfilePicture = (action) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(baseUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => action(data.avatar_url));
};

export const loadGitHubRepos = (action) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(baseUrl + "/repos", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("start");
      const repos = [];
      for (var i = 0; i < data.length; i++) {
        repos.push(data[i]);
      }
      action(repos);
    });
};
