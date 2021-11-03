import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../components/constants/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(API_BASE_URL, requestOptions);
  const data = await response.json();
  const { avatar_url } = data;

  res.redirect(307, avatar_url);
}
