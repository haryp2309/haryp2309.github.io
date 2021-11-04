import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../constants/user";
import { RepoData } from "../../typings/repoData";

import { FILEPATH as PARENT_FILEPATH } from ".";
import { generateOptions, getData } from "helpers/api.helpers";
export const FILEPATH = PARENT_FILEPATH + "/repos";

export const fetchRepoData = async () => {
  const url = `${API_BASE_URL}/repos`;
  type ResponseType = {
    name: string;
    description: string;
    html_url: string;
    id: string;
    topics: string[];
  }[];
  let data = await getData<ResponseType>(url);

  if (!Array.isArray(data)) data = [];

  console.log("😅", data);

  const repoDatas: RepoData[] = data.map(
    ({ name, description, html_url, id, topics }) => ({
      description,
      name,
      url: html_url,
      id,
      highlighted: topics.includes("highlight"),
      topics: topics.filter((topic) => topic !== "highlight"),
    })
  );
  return repoDatas;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repoDatas = await fetchRepoData();
  res.status(200).json(repoDatas);
}
