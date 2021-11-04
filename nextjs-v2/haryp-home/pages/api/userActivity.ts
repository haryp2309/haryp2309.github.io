import { USER_ID } from "constants/user";
import { generateOptions, getData } from "helpers/api.helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { WeeklyActivity } from "typings/weeklyActivity";

import { FILEPATH as PARENT_FILEPATH } from ".";
export const FILEPATH = PARENT_FILEPATH + "/userActivity";

type WeeklyActivityReponse = {
  weeklyActivities: WeeklyActivity[];
};

export const getWeeklyActivity = async (): Promise<WeeklyActivity[]> =>
  (await getData<WeeklyActivityReponse>(FILEPATH)).weeklyActivities;

export const fetchWeeklyActivity = async (
  year: number
): Promise<WeeklyActivityReponse> => {
  type Data = {
    contributions: { week: number; days: { count: number }[] }[];
  };
  const fetchUrl = `https://skyline.github.com/${USER_ID}/${year}.json`;
  const { contributions = [] } = await getData<Data>(fetchUrl);
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
  const { interval = "week", year = 2021 } = req.query;

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
