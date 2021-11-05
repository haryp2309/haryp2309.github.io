import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../constants/user";

import { FILEPATH as PARENT_FILEPATH } from ".";
import { generateOptions } from "helpers/api.helpers";
export const FILEPATH = PARENT_FILEPATH + "/pb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(API_BASE_URL, generateOptions("GET"));
  const data = await response.json();
  const { avatar_url } = data;

  if (avatar_url) res.redirect(307, avatar_url);
  else res.status(500);
  console.log("💁", { res });
}
