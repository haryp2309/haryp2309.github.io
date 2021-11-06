import { NextApiRequest, NextApiResponse } from "next";
import { getApiBaseURL, ORGANISATIONS, USER_ID } from "../../constants/user";
import { RepoData } from "../../typings/repoData";

import { FILEPATH as PARENT_FILEPATH } from ".";
import { generateOptions, getData } from "helpers/api.helpers";
export const FILEPATH = PARENT_FILEPATH + "/repos";

export const fetchRepoData = async () => {
  type ResponseType = {
    name: string;
    description: string;
    html_url: string;
    id: string;
    topics: string[];
  }[];

  const resData = [USER_ID, ...ORGANISATIONS].map(
    async (id): Promise<ResponseType> => {
      const url = `${getApiBaseURL(id)}/repos`;
      const data = await getData<ResponseType>(url);
      return Array.isArray(data) ? data : [];
    }
  );

  const combinedData = (await Promise.all(resData)).reduce(
    (a, b) => [...a, ...b],
    []
  );

  const repoDatas: RepoData[] = combinedData.map(
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
