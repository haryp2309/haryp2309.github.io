import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../components/constants/user";
import { RepoData } from "../../typings/repoData";

export const fetchRepoData = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${API_BASE_URL}/repos`, requestOptions);
  const data = (await response.json()) as any[];
  const repoDatas: RepoData[] = data.map(
    ({
      name,
      description,
      html_url,
      id,
    }: {
      name: string;
      description: string;
      html_url: string;
      id: string;
    }) => ({
      description,
      name,
      url: html_url,
      id,
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
