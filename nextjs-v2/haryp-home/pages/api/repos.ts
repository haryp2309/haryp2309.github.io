import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../constants/user";
import { RepoData } from "../../typings/repoData";

import { FILEPATH as PARENT_FILEPATH } from ".";
import { generateOptions } from "helpers/api.helpers";
export const FILEPATH = PARENT_FILEPATH + "/repos";

export const fetchRepoData = async () => {
  const response = await fetch(`${API_BASE_URL}/repos`, generateOptions("GET"));
  const data = (await response.json()) as any[];
  const repoDatas: RepoData[] = data.map(
    ({
      name,
      description,
      html_url,
      id,
      topics,
    }: {
      name: string;
      description: string;
      html_url: string;
      id: string;
      topics: string[];
    }) => ({
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
