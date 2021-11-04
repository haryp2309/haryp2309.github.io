import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { RepoData } from "../typings/repoData";
import { useEffect, useState } from "react";
import { fetchRepoData } from "./api/repos";
import githubSvg from "../icons/github.svg";
import Image from "next/image";
import { Card } from "../components/card";
import { Chip } from "../components/chip";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeeklyActivity } from "typings/weeklyActivity";
import { fetchWeeklyActivity } from "./api/userActivity";

type HomeProps = {
  repos: RepoData[];
  weeklyActivities: WeeklyActivity[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { repos, weeklyActivities } = props;
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    const newTopics: string[] = [];
    repos.forEach(({ topics }) => {
      topics.forEach((topic) => {
        if (!newTopics.includes(topic)) newTopics.push(topic);
      });
    });
    setTopics(newTopics);
  }, [repos]);

  const toggleTopic = (topic: string) => () => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <motion.div className={styles.container}>
      <div className={styles["centered-container"]}>
        <h1>Commits this year</h1>
        <div className={styles.container}>
          <AreaChart
            className={styles.chart}
            width={730}
            height={250}
            data={weeklyActivities.map(({ week, activity }) => ({
              name: `Week ${week}`,
              week,
              commits: activity,
            }))}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tint)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tint)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="commits"
              stroke="var(--color-tint)"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>
        <h1>Repos</h1>
        <h2>Highlighted</h2>
        <div className={styles["card-grid"]}>
          {repos
            .filter(({ highlighted }) => highlighted)
            .map((repoData) => (
              <Card key={repoData.id} repoData={repoData} />
            ))}
        </div>
        <h2>Other</h2>
        <div className={styles["chips-container"]}>
          {topics.map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={toggleTopic(label)}
              active={selectedTopics.includes(label)}
            />
          ))}
        </div>
        <div className={styles["card-grid"]}>
          {repos
            .filter(({ highlighted }) => !highlighted)
            .filter(
              ({ topics }) =>
                selectedTopics.length === 0 ||
                topics
                  .map((topic) => selectedTopics.includes(topic))
                  .reduce((a, b) => a || b, false)
            )
            .map((repoData) => (
              <Card key={repoData.id} repoData={repoData} />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

Home.getInitialProps = async () => {
  const repos: RepoData[] = await fetchRepoData();
  const weeklyActivities: WeeklyActivity[] = (await fetchWeeklyActivity(2021))
    .weeklyActivities;
  return { repos, weeklyActivities };
};

export default Home;
