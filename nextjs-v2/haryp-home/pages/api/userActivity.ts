import { USER_ID } from "constants/user";
import { generateOptions, getData } from "helpers/api.helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { WeeklyActivity } from "typings/weeklyActivity";
import mockResponse from "../../mockResponses/userActivity.json";

import { FILEPATH as PARENT_FILEPATH } from ".";
export const FILEPATH = PARENT_FILEPATH + "/userActivity";

type WeeklyActivityReponse = {
  weeklyActivities: WeeklyActivity[];
};

export const fetchWeeklyActivity = async (
  year: number
): Promise<WeeklyActivityReponse> => {
  if (process.env.NODE_ENV === "development") {
    return mockResponse;
  }

  type Data = {
    contributions: { week: number; days: { count: number }[] }[];
  };
  const fetchUrl = `https://skyline.github.com/${USER_ID}/${year}.json`;
  let data = await getData<Data>(fetchUrl);
  let i = 3;
  while (!data) {
    data = await getData<Data>(fetchUrl);
    i--;
    if (i < 0) break;
  }
  const { contributions = [] } = data || {};
  const weeklyActivities = contributions.map(({ week, days }) => ({
    week,
    activity: days.map(({ count }) => count).reduce((a, b) => a + b, 0),
  }));

  return {
    weeklyActivities,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { interval = "week", year = new Date().getFullYear() } = req.query;

  switch (interval) {
    default:
    case "week": {
      const responseData: WeeklyActivityReponse = await fetchWeeklyActivity(
        year as number
      );

      res.status(200).json(responseData);
    }
  }
}
