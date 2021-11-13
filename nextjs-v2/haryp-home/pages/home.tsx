import type { GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { RepoData } from "../typings/repoData";
import { fetchRepoData } from "./api/repos";
import { WeeklyActivity } from "typings/weeklyActivity";
import { fetchWeeklyActivity } from "./api/userActivity";
import Header from "next/head";
import { AboutMe } from "containers/home/aboutMe.container";
import { Repos } from "containers/home/repos.container";

type HomeProps = {
  repos: RepoData[];
  weeklyActivities: WeeklyActivity[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { repos, weeklyActivities } = props;

  return (
    <>
      <Header>
        <title>{"Hary Pirajan's projects"}</title>
      </Header>
      <motion.div className={styles.container}>
        <div className={styles["centered-container"]}>
          <AboutMe weeklyActivities={weeklyActivities} />
          <Repos repos={repos} />
        </div>
      </motion.div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const repos: RepoData[] = await fetchRepoData();

  const weeklyActivities: WeeklyActivity[] = (
    await fetchWeeklyActivity(new Date().getFullYear())
  ).weeklyActivities;

  return {
    props: { repos, weeklyActivities },
    revalidate: 10,
  };
};

export default Home;
