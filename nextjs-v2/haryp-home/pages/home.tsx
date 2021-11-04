import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { RepoData } from "../typings/repoData";
import { useEffect, useState } from "react";
import { fetchRepoData } from "./api/repos";
import { Card } from "../components/card";
import { Chip } from "../components/chip";

import { WeeklyActivity } from "typings/weeklyActivity";
import { fetchWeeklyActivity } from "./api/userActivity";
import { CommitChart } from "components/commitChart";

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

  const visibleRepos = repos.filter(
    ({ topics }) =>
      selectedTopics.length === 0 ||
      topics
        .map((topic) => selectedTopics.includes(topic))
        .reduce((a, b) => a || b, false)
  );

  return (
    <motion.div className={styles.container}>
      <div className={styles["centered-container"]}>
        <h1>Commits {new Date().getFullYear()}</h1>
        <div className={styles.container}>
          <CommitChart weeklyActivities={weeklyActivities} />
        </div>
        <h1>Repos</h1>
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
        <h2>Highlighted</h2>
        <div className={styles["card-grid"]}>
          {visibleRepos
            .filter(({ highlighted }) => highlighted)
            .map((repoData) => (
              <Card key={repoData.id} repoData={repoData} />
            ))}
        </div>
        <h2>Other</h2>

        <div className={styles["card-grid"]}>
          {visibleRepos
            .filter(({ highlighted }) => !highlighted)
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
  const weeklyActivities: WeeklyActivity[] = (
    await fetchWeeklyActivity(new Date().getFullYear())
  ).weeklyActivities;
  return { repos, weeklyActivities };
};

export default Home;
