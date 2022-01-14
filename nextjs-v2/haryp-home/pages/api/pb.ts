import { NextApiRequest, NextApiResponse } from "next";
import { getApiBaseURL, USER_ID } from "../../constants/user";

import { FILEPATH as PARENT_FILEPATH } from ".";
import { generateOptions } from "helpers/api.helpers";
export const FILEPATH = PARENT_FILEPATH + "/pb";

const fetchProfilePicture = async (): Promise<string> => {
  const response = await fetch(getApiBaseURL(USER_ID), generateOptions("GET"));
  const data = await response.json();
  const { avatar_url } = data;
  return avatar_url;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const avatar_url = await fetchProfilePicture();
  if (avatar_url) res.redirect(307, avatar_url);
  else throw Error("Something went wrong");
}
